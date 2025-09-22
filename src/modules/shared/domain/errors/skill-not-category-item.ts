import { Schema } from "effect"
import { HttpStatus } from "./category-not-found"

export const skillNotCategoryItemErrorSchema = Schema.Struct({
  code: Schema.Literal("skill_not_category_item"),
  status: Schema.Literal(HttpStatus.BAD_REQUEST),
  message: Schema.String,
})

export type SkillNotCategoryItemError = typeof skillNotCategoryItemErrorSchema.Type