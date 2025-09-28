import { Schema } from "effect"

export const notQuizQuestionErrorSchema = Schema.Struct({
  code: Schema.Literal("not_quiz_question"),
  message: Schema.String,
})

export type NotQuizQuestionError = typeof notQuizQuestionErrorSchema.Type