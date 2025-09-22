import { Schema } from "effect"

export const invalidExpiredTokenErrorSchema = Schema.Struct({
  code: Schema.Literal("invalid_token"),
  message: Schema.String,
})

export type InvalidExpiredTokenError = typeof invalidExpiredTokenErrorSchema.Type
