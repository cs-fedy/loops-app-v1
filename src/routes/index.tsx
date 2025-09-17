import { createFileRoute, redirect } from "@tanstack/react-router"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import type { User } from "@/lib/domain/entities/user"
import { isAuthenticated } from "@/lib/guards/is-authenticated"
import { HomeShell } from "@/lib/shell/home/home-shell"

const authenticatedQuery = queryOptions({
  queryFn: async () => {
    const response = await isAuthenticated()
    if (response._tag === "Failure") throw redirect({ to: "/login" })
    return { user: response.value.user }
  },
  queryKey: ["authenticated"],
})

type HomeScreenProps = { user: User }
function HomeScreen({ user }: HomeScreenProps) {
  console.log(user)
  return (
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
  )
}

export const Route = createFileRoute("/")({
  beforeLoad: async ({ context }) =>
    await context.queryClient.ensureQueryData(authenticatedQuery),
  component: function Home() {
    const { data } = useSuspenseQuery(authenticatedQuery)
    return (
      <HomeShell target={<HomeScreen user={data.user} />} user={data.user} />
    )
  },
})
