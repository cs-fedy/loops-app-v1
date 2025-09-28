import { Schema } from "effect"

export const questionAlreadyCompletedErrorSchema = Schema.Struct({
  code: Schema.Literal("question_already_completed"),
  message: Schema.String,
})

export type QuestionAlreadyCompletedError =
  typeof questionAlreadyCompletedErrorSchema.Type
