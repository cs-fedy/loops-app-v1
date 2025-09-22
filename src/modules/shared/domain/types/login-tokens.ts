import { Schema } from "effect"

export const loginTokensSchema = Schema.Struct({
  access: Schema.Struct({
    expiresIn: Schema.DateFromString,
    token: Schema.String,
  }),
  refresh: Schema.Struct({
    expiresIn: Schema.DateFromString,
    token: Schema.String,
  }),
})

export type LoginTokens = typeof loginTokensSchema.Type
