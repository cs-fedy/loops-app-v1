import { dragDropSchema } from "@/modules/shared/domain/entities/drag-drop"
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

const getExploreDragDropArgsSchema = Schema.Struct({
  categoryId: Schema.String,
  quizId: Schema.String,
  questionId: Schema.String,
})

type GetExploreDragDropArgs = typeof getExploreDragDropArgsSchema.Type

export const getExploreDragDropErrorsSchema = Schema.Union(
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
  quizNotStartedErrorSchema,
  subQuizNotFoundErrorSchema,
  subQuizNotStartedErrorSchema,
  notCategoryItemErrorSchema,
  notQuizQuestionErrorSchema,
  invalidExpiredTokenErrorSchema,
  userNotFoundErrorSchema,
)

export type GetExploreDragDropErrors =
  typeof getExploreDragDropErrorsSchema.Type

export const getExploreDragDropSuccessSchema = Schema.Struct({
  dragDrop: dragDropSchema,
})

export type GetExploreDragDropSuccess =
  typeof getExploreDragDropSuccessSchema.Type

export function getExploreDragDrop(
  args: GetExploreDragDropArgs,
): Effect.Effect<GetExploreDragDropSuccess, GetExploreDragDropErrors> {
  const parsedArgs = parseEffectSchema(getExploreDragDropArgsSchema, args)

  return parseApiResponse({
    error: {
      name: "getExploreDragDropErrors",
      schema: getExploreDragDropErrorsSchema,
    },
    name: "getExploreDragDrop",
    success: {
      name: "getExploreDragDropSuccess",
      schema: getExploreDragDropSuccessSchema,
    },
  })(
    instance.get(
      `/explore/categories/${parsedArgs.categoryId}/quizzes/${parsedArgs.quizId}/drag_drops/${parsedArgs.questionId}`,
    ),
  )
}
