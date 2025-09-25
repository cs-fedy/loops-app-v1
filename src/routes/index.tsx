import { HomeScreen } from "@/modules/content-management/features/home/components/home-screen"
import { HomeSkeleton } from "@/modules/shared/components/common/home-skeleton"
import { BottomTabNavigator } from "@/modules/shared/components/navigation/bottom-tab-navigator"
import { SelectedContentProvider } from "@/modules/shared/contexts/selected-content-context"
import { isAuthenticated } from "@/modules/shared/guards/is-authenticated"
import { CategorySelectionShell } from "@/modules/shared/shell/category_selection/category-selection-shell"
import { ConfirmationShell } from "@/modules/shared/shell/confirmation/confirmation-shell"
import { OnboardingShell } from "@/modules/shared/shell/onboarding/onboarding-shell"
import { SelectedContentShell } from "@/modules/shared/shell/selected_content/selected-content-shell"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute, redirect } from "@tanstack/react-router"
import { zodValidator } from "@tanstack/zod-adapter"
import { Suspense } from "react"
import { z } from "zod"

const authenticatedQuery = queryOptions({
  queryFn: async () => {
    const response = await isAuthenticated()
    if (response._tag === "Failure") throw redirect({ to: "/login" })
    return { user: response.value.user }
  },
  queryKey: ["authenticated"],
})

const searchParamsSchema = z.object({
  category: z
    .string()
    .refine((value) => value === "all" || /^[0-9a-fA-F]{24}$/.test(value))
    .optional(),
  type: z.enum(["details", "content"]).optional(),
  contentId: z.string().optional(),
})

export const Route = createFileRoute("/")({
  beforeLoad: async ({ context }) =>
    await context.queryClient.ensureQueryData(authenticatedQuery),
  validateSearch: zodValidator(searchParamsSchema),
  component: function Home() {
    const {
      data: { user },
    } = useSuspenseQuery(authenticatedQuery)

    const search = Route.useSearch()

    // Behavior logic based on new parameter structure:
    // - When category is "all": Display all categories in the category selection shell
    // - When category is a specific ID:
    //   * If type is "details": Show the category details screen in the category selection shell
    //   * If type is "content" and itemId is undefined: Show the category content screen in the category selection shell
    //   * If type is "content" and itemId is defined: Show the specific content item from the selected content shell

    return (
      <SelectedContentProvider>
        <ConfirmationShell
          target={
            <OnboardingShell
              target={
                <CategorySelectionShell
                  searchParams={search}
                  target={
                    <SelectedContentShell
                      target={
                        <div className="relative min-h-screen">
                          {user.currentCategory && (
                            <div className="relative z-0">
                              <Suspense fallback={<HomeSkeleton />}>
                                <HomeScreen categoryId={user.currentCategory} />
                              </Suspense>
                            </div>
                          )}
                          <div className="fixed right-0 bottom-0 left-0 z-10">
                            <BottomTabNavigator />
                          </div>
                        </div>
                      }
                      searchParams={search}
                    />
                  }
                  user={user}
                />
              }
              user={user}
            />
          }
          user={user}
        />
      </SelectedContentProvider>
    )
  },
})
