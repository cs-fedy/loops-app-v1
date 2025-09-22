import { Schema } from "effect"

export const categoryNotStartedErrorSchema = Schema.Struct({
  code: Schema.Literal("category_not_started"),
  message: Schema.String,
})

export type CategoryNotStartedError = typeof categoryNotStartedErrorSchema.Type
