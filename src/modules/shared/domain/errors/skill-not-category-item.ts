import { Schema } from "effect"

export const skillNotCategoryItemErrorSchema = Schema.Struct({
  code: Schema.Literal("skill_not_category_item"),
  message: Schema.String,
})

export type SkillNotCategoryItemError =
  typeof skillNotCategoryItemErrorSchema.Type
