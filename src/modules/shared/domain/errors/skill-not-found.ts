import { Schema } from "effect"

export const skillNotFoundErrorSchema = Schema.Struct({
  code: Schema.Literal("skill_not_found"),
  message: Schema.String,
})

export type SkillNotFoundError = typeof skillNotFoundErrorSchema.Type
