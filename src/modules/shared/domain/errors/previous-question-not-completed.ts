import { Schema } from "effect"

export const previousQuestionNotCompletedErrorSchema = Schema.Struct({
  code: Schema.Literal("previous_question_not_completed"),
  message: Schema.String,
})

export type PreviousQuestionNotCompletedError = typeof previousQuestionNotCompletedErrorSchema.Type