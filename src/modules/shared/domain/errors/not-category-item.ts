import { Schema } from "effect"

export const notCategoryItemErrorSchema = Schema.Struct({
  code: Schema.Literal("not_category_item"),
  message: Schema.String,
})

export type NotCategoryItemError = typeof notCategoryItemErrorSchema.Type
