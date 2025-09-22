import { Schema } from "effect"

export const quizNotFoundErrorSchema = Schema.Struct({
  code: Schema.Literal("quiz_not_found"),
  message: Schema.String,
})

export type QuizNotFoundError = typeof quizNotFoundErrorSchema.Type
