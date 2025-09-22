import { Schema } from "effect"
import { HttpStatus } from "./category-not-found"

export const skillContentNotFoundErrorSchema = Schema.Struct({
  code: Schema.Literal("skill_content_not_found"),
  status: Schema.Literal(HttpStatus.NOT_FOUND),
  message: Schema.String,
})

export type SkillContentNotFoundError =
  typeof skillContentNotFoundErrorSchema.Type
