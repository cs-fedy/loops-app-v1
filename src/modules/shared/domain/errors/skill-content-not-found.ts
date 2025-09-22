import { Schema } from "effect"

export const skillContentNotFoundErrorSchema = Schema.Struct({
  code: Schema.Literal("skill_content_not_found"),
  message: Schema.String,
})

export type SkillContentNotFoundError =
  typeof skillContentNotFoundErrorSchema.Type
