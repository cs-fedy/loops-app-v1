import { Schema } from "effect"

export const internalErrorSchema = Schema.Struct({
  status: Schema.Literal(500),
  code: Schema.Literal("internal_server_error"),
  message: Schema.String,
})

export type InternalError = typeof internalErrorSchema.Type