import { Schema } from "effect"

export const invalidOperationErrorSchema = Schema.Struct({
  code: Schema.Literal("invalid_operation"),
  message: Schema.String,
})

export type InvalidOperationError = typeof invalidOperationErrorSchema.Type