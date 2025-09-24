import { categoryNotFoundErrorSchema } from "@/modules/shared/domain/errors/category-not-found"
import { categoryNotStartedErrorSchema } from "@/modules/shared/domain/errors/category-not-started"
import { invalidExpiredTokenErrorSchema } from "@/modules/shared/domain/errors/invalid-expired-token"
import { previousQuizNotCompletedErrorSchema } from "@/modules/shared/domain/errors/previous-quiz-not-completed"
import { quizAlreadyStartedErrorSchema } from "@/modules/shared/domain/errors/quiz-already-started"
import { quizNotFoundErrorSchema } from "@/modules/shared/domain/errors/quiz-not-found"
import { userNotFoundErrorSchema } from "@/modules/shared/domain/errors/user-not-found"
import { successMessageSchema } from "@/modules/shared/domain/types/success-message"
import { invalidInputFactory } from "@/modules/shared/domain/utils/invalid-input"
import { instance } from "@/modules/shared/utils/axios"
import { parseApiResponse } from "@/modules/shared/utils/parse-api-response"
import { parseEffectSchema } from "@/modules/shared/utils/parse-effect-schema"
import type { Effect } from "effect"
import { Schema } from "effect"

const startQuizArgsSchema = Schema.Struct({
  categoryId: Schema.String,
  quizId: Schema.String,
})

type StartQuizArgs = typeof startQuizArgsSchema.Type

export const startQuizErrorsSchema = Schema.Union(
  invalidInputFactory(
    Schema.Struct({
      authorization: Schema.optional(Schema.String),
      userId: Schema.optional(Schema.String),
      categoryId: Schema.optional(Schema.String),
      quizId: Schema.optional(Schema.String),
    }),
  ),
  quizAlreadyStartedErrorSchema,
  previousQuizNotCompletedErrorSchema,
  quizNotFoundErrorSchema,
  categoryNotFoundErrorSchema,
  categoryNotStartedErrorSchema,
  invalidExpiredTokenErrorSchema,
  userNotFoundErrorSchema,
)

export type StartQuizErrors = typeof startQuizErrorsSchema.Type

export const startQuizSuccessSchema = successMessageSchema

export type StartQuizSuccess = typeof startQuizSuccessSchema.Type

type StartQuizResult = Effect.Effect<StartQuizSuccess, StartQuizErrors>

export const startQuizExitSchema = Schema.Exit({
  defect: Schema.String,
  failure: startQuizErrorsSchema,
  success: startQuizSuccessSchema,
})

export function startQuiz(args: StartQuizArgs): StartQuizResult {
  const parsedArgs = parseEffectSchema(startQuizArgsSchema, args)
  const url = `/explore/categories/${parsedArgs.categoryId}/quizzes/${parsedArgs.quizId}/started`
  const response = instance.post(url)

  return parseApiResponse({
    error: {
      name: "StartQuizErrors",
      schema: startQuizErrorsSchema,
    },
    name: "StartQuiz",
    success: {
      name: "StartQuizSuccess",
      schema: startQuizSuccessSchema,
    },
  })(response)
}