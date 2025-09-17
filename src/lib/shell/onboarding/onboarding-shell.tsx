import { LoadingScreen } from "../../../components/common/loading-screen"
import type { ReactNode } from "react"
import type { User } from "@/lib/domain/entities/user"
import { usePageLoading } from "@/hooks/use-page-loading"

type OnboardingShellProps = { target: ReactNode; user: User }

export function OnboardingShell({ target, user }: OnboardingShellProps) {
  const isLoading = usePageLoading()

  if (isLoading) return <LoadingScreen />
  if (user.isFirstTime) return <OnboardingStepper />
  return target
}

function OnboardingStepper() {
  return (
    <div className="bg-loops-background h-screen w-screen px-4 py-6">
      <div className="flex size-full flex-col items-center justify-center gap-y-10">
        <h2 className="font-outfit text-loops-cyan text-center text-3xl leading-5 font-bold tracking-tight break-words">
          Welcome to Loops!
        </h2>
        <p className="font-outfit text-loops-white text-center text-base leading-6 font-normal">
          Let&apos;s get you started on your coding journey.
        </p>
        {/* TODO: Add onboarding stepper component */}
      </div>
    </div>
  )
}
