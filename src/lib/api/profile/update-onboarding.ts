import { invalidExpiredTokenErrorSchema } from "@/lib/domain/errors/invalid-expired-token"
import { userNotFoundErrorSchema } from "@/lib/domain/errors/user-not-found"
import { successMessageSchema } from "@/lib/domain/types/success-message"
import { invalidInputFactory } from "@/lib/domain/utils/invalid-input"
import { instance } from "@/lib/utils/axios"
import { parseApiResponse } from "@/lib/utils/parse-api-response"
import { parseEffectSchema } from "@/lib/utils/parse-effect-schema"
import type { Effect } from "effect"
import { Schema } from "effect"

const onboardingArgsSchema = Schema.Struct({
  background: Schema.String,
  codingExperience: Schema.String,
  duration: Schema.Number.pipe(Schema.int()),
})

type OnboardingArgs = typeof onboardingArgsSchema.Type

export const onboardingErrorsSchema = Schema.Union(
  invalidInputFactory(
    Schema.Struct({
      authorization: Schema.optional(Schema.String),
      background: Schema.optional(Schema.String),
      codingExperience: Schema.optional(Schema.String),
      duration: Schema.optional(Schema.String),
      userId: Schema.optional(Schema.String),
    }),
  ),
  invalidExpiredTokenErrorSchema,
  userNotFoundErrorSchema,
)

export type OnboardingErrors = typeof onboardingErrorsSchema.Type

export const onboardingSuccessSchema = successMessageSchema

type OnboardingResult = Effect.Effect<OnboardingSuccess, OnboardingErrors>
type OnboardingSuccess = typeof onboardingSuccessSchema.Type

export const onboardingExitSchema = Schema.Exit({
  defect: Schema.String,
  failure: onboardingErrorsSchema,
  success: onboardingSuccessSchema,
})

export function onboarding(args: OnboardingArgs): OnboardingResult {
  const parsedArgs = parseEffectSchema(onboardingArgsSchema, args)
  const response = instance.patch("/profile/onboarding", parsedArgs)

  return parseApiResponse({
    error: {
      name: "OnboardingErrors",
      schema: onboardingErrorsSchema,
    },
    name: "Onboarding",
    success: {
      name: "OnboardingSuccess",
      schema: onboardingSuccessSchema,
    },
  })(response)
}
