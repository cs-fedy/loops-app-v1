import { Schema } from "effect"
import { HttpStatus } from "./category-not-found"

export const quizNotCategoryItemErrorSchema = Schema.Struct({
  code: Schema.Literal("quiz_not_category_item"),
  status: Schema.Literal(HttpStatus.BAD_REQUEST),
  message: Schema.String,
})

export type QuizNotCategoryItemError = typeof quizNotCategoryItemErrorSchema.Type