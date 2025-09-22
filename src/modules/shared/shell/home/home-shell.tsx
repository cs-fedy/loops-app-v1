import type { User } from "@/modules/shared/domain/entities/user"
import type { ReactNode } from "react"
import { CategorySelectionShell } from "../category_selection/category-selection-shell"
import { ConfirmationShell } from "../confirmation/confirmation-shell"
import { OnboardingShell } from "../onboarding/onboarding-shell"

type HomeShellProps = {
  target: ReactNode
  user: User
  searchParams: {
    category: string
    details: boolean
  }
}

export function HomeShell({
  target,
  user,
  searchParams, //
}: HomeShellProps) {
  return (
    <ConfirmationShell
      target={
        <OnboardingShell
          target={
            <CategorySelectionShell
              searchParams={searchParams}
              target={target}
              user={user}
            />
          }
          user={user}
        />
      }
      user={user}
    />
  )
}
