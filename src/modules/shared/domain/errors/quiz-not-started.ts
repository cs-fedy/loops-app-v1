import { Schema } from "effect"

export const quizNotStartedErrorSchema = Schema.Struct({
  code: Schema.Literal("quiz_not_started"),
  message: Schema.String,
})

export type QuizNotStartedError = typeof quizNotStartedErrorSchema.Type
