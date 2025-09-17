import { LoadingScreen } from "../../../components/common/loading-screen"
import type { ReactNode } from "react"
import type { User } from "@/lib/domain/entities/user"
import { usePageLoading } from "@/hooks/use-page-loading"

type CategorySelectionShellProps = { target: ReactNode; user: User }

export function CategorySelectionShell({
  target,
  user,
}: CategorySelectionShellProps) {
  const isLoading = usePageLoading()

  if (isLoading) return <LoadingScreen />
  if (!user.currentCategory) return <CategorySelectionScreen />

  return target
}

function CategorySelectionScreen() {
  return (
    <div className="bg-loops-background h-screen w-screen px-4 py-6">
      <div className="flex size-full flex-col items-center justify-center gap-y-10">
        <h2 className="font-outfit text-loops-cyan text-center text-3xl leading-5 font-bold tracking-tight break-words">
          Choose Your Path
        </h2>
        <p className="font-outfit text-loops-white text-center text-base leading-6 font-normal">
          Select the programming categories you&apos;d like to explore.
        </p>
        {/* TODO: Add category selection component */}
      </div>
    </div>
  )
}
