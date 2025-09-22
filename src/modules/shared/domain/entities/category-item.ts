import { Schema } from "effect"

export const categoryItemSchema = Schema.Struct({
  categoryItemId: Schema.String,
  categoryId: Schema.String,
  itemId: Schema.String,
  itemType: Schema.Literal("skills", "quizzes"),
  previousCategoryItem: Schema.optional(Schema.String),
  nextCategoryItem: Schema.optional(Schema.String),
})

export type CategoryItem = typeof categoryItemSchema.Type