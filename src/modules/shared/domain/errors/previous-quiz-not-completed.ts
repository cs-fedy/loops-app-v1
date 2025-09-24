import { Schema } from "effect"

export const previousQuizNotCompletedErrorSchema = Schema.Struct({
  code: Schema.Literal("previous_quiz_not_completed"),
  message: Schema.String,
})

export type PreviousQuizNotCompletedError = typeof previousQuizNotCompletedErrorSchema.Type