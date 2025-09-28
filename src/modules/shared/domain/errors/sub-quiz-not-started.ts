import { Schema } from "effect"

export const subQuizNotStartedErrorSchema = Schema.Struct({
  code: Schema.Literal("sub_quiz_not_started"),
  message: Schema.String,
})

export type SubQuizNotStartedError = typeof subQuizNotStartedErrorSchema.Type