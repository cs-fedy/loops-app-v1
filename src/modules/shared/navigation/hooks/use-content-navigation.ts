import { useCategoryContent } from "@/modules/content-management/features/content-list/services/use-category-content"
import { singleCategoryItemFn } from "@/modules/content-management/features/single-item/services/single-category-item-fn.server"
import { useSelectedContent } from "@/modules/shared/contexts/selected-content-context"
import type { CategoryContentItem } from "@/modules/shared/domain/entities/category-content-item"
import { useToast } from "@/modules/shared/hooks/use-toast"
import { useStartQuiz } from "@/modules/shared/shell/category_selection/services/use-start-quiz"
import { useStartSkill } from "@/modules/shared/shell/category_selection/services/use-start-skill"
import { useQueryClient } from "@tanstack/react-query"
import { useCanGoBack, useRouter } from "@tanstack/react-router"
import { Effect } from "effect"
import { useCallback, useMemo } from "react"
import { NavigationManager } from "../managers/navigation-manager"
import { NavigationCompletionService } from "../services/navigation-completion-service"
import type { NavigationError } from "../types/navigation-types"

export function useContentNavigation() {
  const router = useRouter()
  const canGoBack = useCanGoBack()
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  const {
    selectedItem,
    navigationState,
    navigateToItem,
    clearSelectedContent,
    setNavigationState,
    resetNavigationState,
  } = useSelectedContent()

  // Fetch category items if selectedItem is available
  const { categoryItems } = selectedItem
    ? useCategoryContent({ categoryId: selectedItem.categoryId })
    : { categoryItems: [] }

  const startSkillHook = useStartSkill()
  const startQuizHook = useStartQuiz()

  // Initialize services
  const navigationManager = useMemo(() => new NavigationManager(), [])

  const completionService = useMemo(
    () => new NavigationCompletionService(startSkillHook, startQuizHook),
    [startSkillHook, startQuizHook],
  )

  const checkIfNextItemIsAvailable = useCallback(
    async (currentItem: CategoryContentItem): Promise<boolean> => {
      // Check if next item exists
      const nextItemId = currentItem.nextCategoryItem
      if (!nextItemId) {
        return false
      }

      const fetchNextItemEffect = Effect.tryPromise({
        try: () =>
          singleCategoryItemFn({
            data: { categoryId: currentItem.categoryId, itemId: nextItemId },
          }),
        catch: () => ({
          code: "fetch_error" as const,
          message: "Failed to fetch next item",
        }),
      })

      const result = await Effect.runPromise(
        Effect.match(fetchNextItemEffect, {
          onFailure: () => false,
          onSuccess: (response) => {
            if (response._tag === "Failure") {
              return false
            }

            const nextItem = response.value.categoryItem

            // Check if next item is started or completed
            const isNextItemStartedOrCompleted =
              nextItem.contentType === "skills"
                ? nextItem.completedSkill !== undefined
                : nextItem.contentType === "quizzes"
                  ? nextItem.startedQuiz !== undefined
                  : false

            return isNextItemStartedOrCompleted
          },
        }),
      )

      return result
    },
    [],
  )

  const shouldUseSimpleNavigation = useCallback(
    async (currentItem: CategoryContentItem | null): Promise<boolean> => {
      if (!currentItem) {
        return false
      }

      const isCurrentItemValidated =
        currentItem.contentType === "quizzes"
          ? currentItem.startedQuiz?.status === "completed"
          : currentItem.contentType === "skills"
            ? currentItem.completedSkill?.isCompleted === true
            : false

      if (!isCurrentItemValidated) {
        return false
      }

      return await checkIfNextItemIsAvailable(currentItem)
    },
    [checkIfNextItemIsAvailable],
  )

  const performSimpleNavigation = useCallback(
    async (
      currentItem: CategoryContentItem,
      direction: "next" | "previous",
    ) => {
      const targetItemId =
        direction === "next"
          ? currentItem.nextCategoryItem!
          : currentItem.previousCategoryItem!

      const fetchTargetItemEffect = Effect.tryPromise({
        try: () =>
          singleCategoryItemFn({
            data: { categoryId: currentItem.categoryId, itemId: targetItemId },
          }),
        catch: () => ({
          code: "fetch_error" as const,
          message: "Failed to fetch target item",
        }),
      })

      const navigationEffect = Effect.gen(function* () {
        const response = yield* fetchTargetItemEffect

        if (response._tag === "Failure") {
          return yield* Effect.fail({
            code: "navigation_error" as const,
            message: "Failed to load target item",
          })
        }

        const targetItem = response.value.categoryItem

        // Update context with the new item
        setNavigationState({
          isNavigating: true,
          navigationDirection: direction,
          previousItem: currentItem,
        })

        // Navigate using router
        yield* Effect.tryPromise({
          try: () =>
            router.navigate({
              to: "/",
              search: {
                category: currentItem.categoryId,
                type: "content",
                contentId: targetItemId,
              },
            }),
          catch: () => ({
            code: "router_error" as const,
            message: "Failed to navigate with router",
          }),
        })

        // Update selected content with direction
        navigateToItem({ item: targetItem, direction })

        // Reset navigation state
        resetNavigationState()

        return {
          targetItem,
          direction,
        }
      })

      await Effect.runPromise(
        Effect.match(navigationEffect, {
          onFailure: (failure) => {
            resetNavigationState()
            error(failure.message || "Simple navigation failed")
          },
          onSuccess: ({ targetItem, direction }) => {
            success(
              `Navigated to ${direction} ${targetItem.contentType.slice(0, -1)}`,
            )
          },
        }),
      )
    },
    [
      router,
      navigateToItem,
      setNavigationState,
      resetNavigationState,
      success,
      error,
    ],
  )

  const handleNavigationResult = useCallback(
    async (
      navigationEffect: Effect.Effect<CategoryContentItem, NavigationError>,
      direction: "next" | "previous",
    ) => {
      await Effect.runPromise(
        Effect.match(navigationEffect, {
          onFailure: (navigationError) => {
            // Handle navigation failure based on error type
            const errorMessages: Record<NavigationError["_tag"], string> = {
              NoNextItem: "No next item available",
              NoPreviousItem: "No previous item available",
              CompletionRequired:
                "Please complete the current item before proceeding",
              ValidationFailed: "Navigation failed due to validation error",
              InvalidContentType: "Invalid content type for navigation",
              FetchError: "Failed to fetch navigation target",
              RouterError: "Navigation routing error occurred",
              NoStrategyFound: "No suitable navigation strategy found",
            }

            error(
              errorMessages[navigationError._tag] ||
                navigationError.message ||
                "Navigation failed",
            )
          },
          onSuccess: async (targetItem) => {
            // Update router to reflect new content
            await router.navigate({
              to: "/",
              search: (prev: any) => ({
                ...prev,
                type: "content",
                contentId: targetItem.itemId,
                category: targetItem.categoryId,
              }),
            })

            // Update context with navigation
            navigateToItem({ item: targetItem, direction })

            // Invalidate queries to refresh data
            await queryClient.invalidateQueries({
              queryKey: [
                "single-category-item",
                targetItem.categoryId,
                targetItem.itemId,
              ],
            })

            success(
              `Navigated to ${direction} ${targetItem.contentType.slice(0, -1)}`,
            )
          },
        }),
      )
    },
    [router, navigateToItem, queryClient, success, error],
  )

  const navigateToNext = useCallback(async () => {
    if (!selectedItem) {
      error("No item selected")
      return
    }

    // Check if we can use simple navigation
    const canUseSimpleNavigation = await shouldUseSimpleNavigation(selectedItem)

    if (canUseSimpleNavigation) {
      await performSimpleNavigation(selectedItem, "next")
    } else {
      const navigationEffect = navigationManager.navigateToNext({
        currentItem: selectedItem,
        categoryItems,
      })

      await handleNavigationResult(navigationEffect, "next")
    }
  }, [
    selectedItem,
    categoryItems,
    navigationManager,
    handleNavigationResult,
    error,
    shouldUseSimpleNavigation,
    performSimpleNavigation,
  ])

  const navigateToPrevious = useCallback(async () => {
    if (!selectedItem) {
      error("No item selected")
      return
    }

    const navigationEffect = navigationManager.navigateToPrevious({
      currentItem: selectedItem,
      categoryItems,
    })

    await handleNavigationResult(navigationEffect, "previous")
  }, [
    selectedItem,
    categoryItems,
    navigationManager,
    handleNavigationResult,
    error,
  ])

  const canNavigateNext = useCallback(async (): Promise<boolean> => {
    if (!selectedItem) return false

    const canNavigateEffect = navigationManager.canNavigateNext({
      currentItem: selectedItem,
      categoryItems,
    })

    return await Effect.runPromise(
      Effect.match(canNavigateEffect, {
        onFailure: () => false,
        onSuccess: (canNavigate) => canNavigate,
      }),
    )
  }, [selectedItem, categoryItems, navigationManager])

  const canNavigatePrevious = useCallback(async (): Promise<boolean> => {
    if (!selectedItem) return false

    const canNavigateEffect = navigationManager.canNavigatePrevious({
      currentItem: selectedItem,
      categoryItems,
    })

    return await Effect.runPromise(
      Effect.match(canNavigateEffect, {
        onFailure: () => false,
        onSuccess: (canNavigate) => canNavigate,
      }),
    )
  }, [selectedItem, categoryItems, navigationManager])

  const handleBackNavigation = useCallback(() => {
    // Reset navigation state when going back
    resetNavigationState()

    if (!canGoBack) {
      // Clear selected content and navigate to home
      clearSelectedContent()
      router.navigate({ to: "/" })
    } else {
      // Use browser history
      router.history.back()
    }
  }, [canGoBack, router, clearSelectedContent, resetNavigationState])

  const exitContent = useCallback(() => {
    // Clear all navigation state and selected content
    clearSelectedContent()
    resetNavigationState()

    // Navigate back to category view
    if (selectedItem) {
      router.navigate({
        to: "/",
        search: (prev: any) => ({
          ...prev,
          category: selectedItem.categoryId,
          type: undefined,
          contentId: undefined,
        }),
      })
    } else {
      router.navigate({ to: "/" })
    }
  }, [selectedItem, router, clearSelectedContent, resetNavigationState])

  const validateAndStartItem = useCallback(
    async (item: CategoryContentItem): Promise<boolean> => {
      return await completionService.validateAndStartItem(item)
    },
    [completionService],
  )

  const isItemCompleted = useCallback(
    (item: CategoryContentItem): boolean => {
      return completionService.isItemCompleted(item)
    },
    [completionService],
  )

  return {
    // Navigation actions
    navigateToNext,
    navigateToPrevious,
    handleBackNavigation,
    exitContent,

    // Navigation state checks
    canNavigateNext,
    canNavigatePrevious,

    // Current state
    selectedItem,
    navigationState,

    // Completion utilities
    validateAndStartItem,
    isItemCompleted,

    // Router utilities
    canGoBack,
  }
}
