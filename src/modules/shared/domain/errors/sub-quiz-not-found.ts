import { Schema } from "effect"

export const subQuizNotFoundErrorSchema = Schema.Struct({
  code: Schema.Literal("sub_quiz_not_found"),
  message: Schema.String,
})

export type SubQuizNotFoundError = typeof subQuizNotFoundErrorSchema.Type