import { LoadingScreen } from "../../../components/common/loading-screen"
import { OnboardingStepper } from "./onboarding-stepper"
import { OnboardingFormProvider } from "./onboarding-context"
import { ChooseLevelStep } from "./steps/choose-level-step"
import { ChooseStatusStep } from "./steps/choose-status-step"
import { ChooseGoalsStep } from "./steps/choose-goals-step"
import { WelcomeStep } from "./steps/welcome-step"
import type { ReactNode } from "react"
import type { User } from "@/lib/domain/entities/user"
import { usePageLoading } from "@/hooks/use-page-loading"

type OnboardingShellProps = {
  target: ReactNode
  user: User
}

export function OnboardingShell({ target, user }: OnboardingShellProps) {
  const isLoading = usePageLoading()

  if (isLoading) return <LoadingScreen />

  if (user.isFirstTime)
    return (
      <OnboardingFormProvider>
        <OnboardingStepper
          goal={<ChooseGoalsStep />}
          level={<ChooseLevelStep />}
          status={<ChooseStatusStep />}
          welcome={<WelcomeStep />}
        />
      </OnboardingFormProvider>
    )
  return target
}
