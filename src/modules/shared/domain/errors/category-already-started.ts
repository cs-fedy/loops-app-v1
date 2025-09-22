import { Schema } from "effect"

export const categoryAlreadyStartedErrorSchema = Schema.Struct({
  code: Schema.Literal("category_already_started"),
  message: Schema.String,
})

export type CategoryAlreadyStartedError =
  typeof categoryAlreadyStartedErrorSchema.Type
