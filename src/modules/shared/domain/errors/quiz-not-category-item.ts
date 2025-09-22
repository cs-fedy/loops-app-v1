import { Schema } from "effect"

export const quizNotCategoryItemErrorSchema = Schema.Struct({
  code: Schema.Literal("quiz_not_category_item"),
  message: Schema.String,
})

export type QuizNotCategoryItemError =
  typeof quizNotCategoryItemErrorSchema.Type
