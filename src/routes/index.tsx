import { isAuthenticated } from "@/modules/shared/guards/is-authenticated"
import { HomeShell } from "@/modules/shared/shell/home/home-shell"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute, redirect } from "@tanstack/react-router"
import { zodValidator } from "@tanstack/zod-adapter"
import z from "zod"

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
    .optional()
    .transform((value) => (value === undefined ? "all" : value)),
  details: z.coerce.boolean().optional().default(false),
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
          <div className="bg-loops-background h-screen w-screen px-4 py-6">
            <div className="flex size-full flex-col items-center justify-center gap-y-10">
              <h1 className="font-outfit text-loops-cyan text-center text-3xl leading-5 font-bold tracking-tight break-words">
                Welcome Home!
              </h1>
              <p className="font-outfit text-loops-white text-center text-base leading-6 font-normal">
                You&apos;re all set up and ready to start coding.
              </p>
            </div>
          </div>
        }
        user={user}
        searchParams={search}
      />
    )
  },
})
