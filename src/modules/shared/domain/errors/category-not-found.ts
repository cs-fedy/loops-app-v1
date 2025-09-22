import { Schema } from "effect"

export const categoryNotFoundErrorSchema = Schema.Struct({
  code: Schema.Literal("category_not_found"),
  message: Schema.String,
})

export type CategoryNotFoundError = typeof categoryNotFoundErrorSchema.Type
