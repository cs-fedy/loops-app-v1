import { Schema } from "effect"

export const invalidRefreshTokenErrorSchema = Schema.Struct({
  code: Schema.Literal("invalid_refresh_token"),
  message: Schema.String,
})

export type InvalidRefreshTokenError = typeof invalidRefreshTokenErrorSchema.Type
