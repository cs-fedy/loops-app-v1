import { Schema } from "effect"
import { HttpStatus } from "./category-not-found"

export const quizNotFoundErrorSchema = Schema.Struct({
  code: Schema.Literal("quiz_not_found"),
  status: Schema.Literal(HttpStatus.NOT_FOUND),
  message: Schema.String,
})

export type QuizNotFoundError = typeof quizNotFoundErrorSchema.Type