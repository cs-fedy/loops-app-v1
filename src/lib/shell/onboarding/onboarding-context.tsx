import { useOnboarding } from "@/features/onboarding/use-onboarding"
import { useToast } from "@/hooks/use-toast"
import { useForm } from "@tanstack/react-form"
import type { PropsWithChildren } from "react"
import { createContext, useContext } from "react"
import { z } from "zod"

export const OnboardingFormSchema = z.object({
  dailyGoal: z.enum(["5min", "10min", "15min", "20min"]),
  level: z.enum(["beginner", "average", "skilled", "expert"]),
  status: z.enum(["student", "professional", "developer", "passionate"]),
})

export type OnboardingFormData = z.infer<typeof OnboardingFormSchema>

const createOnboardingForm = () => {
  const { handleOnboarding } = useOnboarding()
  const { error } = useToast()

  return useForm({
    defaultValues: {
      dailyGoal: "10min",
      level: "beginner",
      status: "student",
    } as OnboardingFormData,
    onSubmit: async ({ value }) => {
      const response = await handleOnboarding(value)

      if (response._tag === "Failure")
        error("Onboarding Failed", {
          description: "An error occurred during onboarding",
        })
    },
  })
}

type OnboardingFormApi = ReturnType<typeof createOnboardingForm>

const OnboardingFormContext = createContext({} as OnboardingFormApi)

export function OnboardingFormProvider({ children }: PropsWithChildren) {
  const form = createOnboardingForm()

  return (
    <OnboardingFormContext.Provider value={form}>
      {children}
    </OnboardingFormContext.Provider>
  )
}

export function useOnboardingForm(): OnboardingFormApi {
  return useContext(OnboardingFormContext)
}
