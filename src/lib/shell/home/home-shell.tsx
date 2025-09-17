import { ConfirmationShell } from "../confirmation/confirmation-shell"
import { OnboardingShell } from "../onboarding/onboarding-shell"
import { CategorySelectionShell } from "../category_selection/category-selection-shell"
import type { ReactNode } from "react"
import type { User } from "@/lib/domain/entities/user"

type HomeShellProps = { target: ReactNode; user: User }

export function HomeShell({ target, user }: HomeShellProps) {
  return (
    <ConfirmationShell
      target={
        <OnboardingShell
          target={
            <CategorySelectionShell //
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
