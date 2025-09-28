import { sequenceOrderSchema } from "@/modules/shared/domain/entities/sequence-order"
import { categoryNotFoundErrorSchema } from "@/modules/shared/domain/errors/category-not-found"
import { categoryNotStartedErrorSchema } from "@/modules/shared/domain/errors/category-not-started"
import { invalidExpiredTokenErrorSchema } from "@/modules/shared/domain/errors/invalid-expired-token"
import { notCategoryItemErrorSchema } from "@/modules/shared/domain/errors/not-category-item"
import { notQuizQuestionErrorSchema } from "@/modules/shared/domain/errors/not-quiz-question"
import { quizNotFoundErrorSchema } from "@/modules/shared/domain/errors/quiz-not-found"
import { quizNotStartedErrorSchema } from "@/modules/shared/domain/errors/quiz-not-started"
import { subQuizNotFoundErrorSchema } from "@/modules/shared/domain/errors/sub-quiz-not-found"
import { subQuizNotStartedErrorSchema } from "@/modules/shared/domain/errors/sub-quiz-not-started"
import { userNotFoundErrorSchema } from "@/modules/shared/domain/errors/user-not-found"
import { invalidInputFactory } from "@/modules/shared/domain/utils/invalid-input"
import { instance } from "@/modules/shared/utils/axios"
import { parseApiResponse } from "@/modules/shared/utils/parse-api-response"
import { parseEffectSchema } from "@/modules/shared/utils/parse-effect-schema"
import type { Effect } from "effect"
import { Schema } from "effect"

const getExploreSequenceOrderArgsSchema = Schema.Struct({
  categoryId: Schema.String,
  quizId: Schema.String,
  questionId: Schema.String,
})

type GetExploreSequenceOrderArgs = typeof getExploreSequenceOrderArgsSchema.Type

export const getExploreSequenceOrderErrorsSchema = Schema.Union(
  invalidInputFactory(
    Schema.Struct({
      authorization: Schema.optional(Schema.String),
      userId: Schema.optional(Schema.String),
      categoryId: Schema.optional(Schema.String),
      quizId: Schema.optional(Schema.String),
      questionId: Schema.optional(Schema.String),
    }),
  ),
  categoryNotFoundErrorSchema,
  categoryNotStartedErrorSchema,
  quizNotFoundErrorSchema,
  notCategoryItemErrorSchema,
  quizNotStartedErrorSchema,
  subQuizNotStartedErrorSchema,
  subQuizNotFoundErrorSchema,
  notQuizQuestionErrorSchema,
  invalidExpiredTokenErrorSchema,
  userNotFoundErrorSchema,
)

export type GetExploreSequenceOrderErrors =
  typeof getExploreSequenceOrderErrorsSchema.Type

export const getExploreSequenceOrderSuccessSchema = Schema.Struct({
  sequenceOrder: sequenceOrderSchema,
})

export type GetExploreSequenceOrderSuccess =
  typeof getExploreSequenceOrderSuccessSchema.Type

type GetExploreSequenceOrderResult = Effect.Effect<
  GetExploreSequenceOrderSuccess,
  GetExploreSequenceOrderErrors
>

export const getExploreSequenceOrderExitSchema = Schema.Exit({
  defect: Schema.String,
  failure: getExploreSequenceOrderErrorsSchema,
  success: getExploreSequenceOrderSuccessSchema,
})

export function getExploreSequenceOrder(
  args: GetExploreSequenceOrderArgs,
): GetExploreSequenceOrderResult {
  const parsedArgs = parseEffectSchema(getExploreSequenceOrderArgsSchema, args)
  const url = `/explore/categories/${parsedArgs.categoryId}/quizzes/${parsedArgs.quizId}/sequence_orders/${parsedArgs.questionId}`
  const response = instance.get(url)

  return parseApiResponse({
    error: {
      name: "GetExploreSequenceOrderErrors",
      schema: getExploreSequenceOrderErrorsSchema,
    },
    name: "GetExploreSequenceOrder",
    success: {
      name: "GetExploreSequenceOrderSuccess",
      schema: getExploreSequenceOrderSuccessSchema,
    },
  })(response)
}
