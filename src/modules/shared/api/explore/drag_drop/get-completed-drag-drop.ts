import { completedDragDropSchema } from "@/modules/shared/domain/entities/completed-drag-drop"
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

const getCompletedDragDropArgsSchema = Schema.Struct({
  categoryId: Schema.String,
  quizId: Schema.String,
  questionId: Schema.String,
})

type GetCompletedDragDropArgs = typeof getCompletedDragDropArgsSchema.Type

export const getCompletedDragDropErrorsSchema = Schema.Union(
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

export type GetCompletedDragDropErrors = typeof getCompletedDragDropErrorsSchema.Type

export const getCompletedDragDropSuccessSchema = Schema.Struct({
  completedDragDrop: completedDragDropSchema,
})

export type GetCompletedDragDropSuccess =
  typeof getCompletedDragDropSuccessSchema.Type

type GetCompletedDragDropResult = Effect.Effect<
  GetCompletedDragDropSuccess,
  GetCompletedDragDropErrors
>

export const getCompletedDragDropExitSchema = Schema.Exit({
  defect: Schema.String,
  failure: getCompletedDragDropErrorsSchema,
  success: getCompletedDragDropSuccessSchema,
})

export type GetCompletedDragDropExit = typeof getCompletedDragDropExitSchema.Type

export const getCompletedDragDrop = (
  args: GetCompletedDragDropArgs,
): GetCompletedDragDropResult => {
  const parsedArgs = parseEffectSchema(getCompletedDragDropArgsSchema, args)
  const url = `/explore/categories/${parsedArgs.categoryId}/quizzes/${parsedArgs.quizId}/drag_drops/${parsedArgs.questionId}/completed`
  const response = instance.get(url)

  return parseApiResponse({
    error: {
      name: "GetCompletedDragDropErrors",
      schema: getCompletedDragDropErrorsSchema,
    },
    name: "GetCompletedDragDrop",
    success: {
      name: "GetCompletedDragDropSuccess",
      schema: getCompletedDragDropSuccessSchema,
    },
  })(response)
}