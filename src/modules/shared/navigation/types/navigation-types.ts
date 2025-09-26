import type { CategoryContentItem } from "@/modules/shared/domain/entities/category-content-item"
import { Effect } from "effect"

export type NavigationDirection = "next" | "previous"

export type NavigationError =
  | { readonly _tag: "NoNextItem"; readonly message: string }
  | { readonly _tag: "NoPreviousItem"; readonly message: string }
  | { readonly _tag: "CompletionRequired"; readonly message: string }
  | { readonly _tag: "ValidationFailed"; readonly message: string }
  | { readonly _tag: "InvalidContentType"; readonly message: string }
  | { readonly _tag: "FetchError"; readonly message: string }
  | { readonly _tag: "RouterError"; readonly message: string }
  | { readonly _tag: "NoStrategyFound"; readonly message: string }

export type NavigationContext = {
  currentItem: CategoryContentItem
  direction: NavigationDirection
  categoryId: string
  adjacentItem?: CategoryContentItem
}

export interface INavigationStrategy {
  canNavigate(context: NavigationContext): boolean
  navigate(
    context: NavigationContext,
  ): Effect.Effect<CategoryContentItem, NavigationError>
  validateCompletion(item: CategoryContentItem): boolean
}

export interface INavigationManager {
  navigateToNext(params: {
    currentItem: CategoryContentItem
    categoryItems: CategoryContentItem[]
  }): Effect.Effect<CategoryContentItem, NavigationError>
  navigateToPrevious(params: {
    currentItem: CategoryContentItem
    categoryItems: CategoryContentItem[]
  }): Effect.Effect<CategoryContentItem, NavigationError>
  canNavigateNext(params: {
    currentItem: CategoryContentItem
    categoryItems: CategoryContentItem[]
  }): Effect.Effect<boolean, NavigationError>
  canNavigatePrevious(params: {
    currentItem: CategoryContentItem
    categoryItems: CategoryContentItem[]
  }): Effect.Effect<boolean, NavigationError>
}

export type NavigationStrategyType =
  | "skill-to-skill"
  | "skill-to-quiz"
  | "quiz-to-skill"
  | "quiz-to-quiz"

export type StrategyPayload = {
  strategy: INavigationStrategy
  adjacentItem: CategoryContentItem
}
