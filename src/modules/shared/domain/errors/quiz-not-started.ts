import { Schema } from "effect"
import { HttpStatus } from "./category-not-found"

export const quizNotStartedErrorSchema = Schema.Struct({
  code: Schema.Literal("quiz_not_started"),
  status: Schema.Literal(HttpStatus.BAD_REQUEST),
  message: Schema.String,
})

export type QuizNotStartedError = typeof quizNotStartedErrorSchema.Type
