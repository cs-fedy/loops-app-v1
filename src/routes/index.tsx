import { HomeScreen } from "@/modules/content-management/features/home/components/home-screen"
import { HomeSkeleton } from "@/modules/shared/components/common/home-skeleton"
import { BottomTabNavigator } from "@/modules/shared/components/navigation/bottom-tab-navigator"
import { isAuthenticated } from "@/modules/shared/guards/is-authenticated"
import { HomeShell } from "@/modules/shared/shell/home/home-shell"
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
  details: z.coerce.boolean().optional(),
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

    return (
      <HomeShell
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
        user={user}
        searchParams={search}
      />
    )
  },
})
