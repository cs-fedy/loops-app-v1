import { Schema } from "effect"

export const skillNotCompletedErrorSchema = Schema.Struct({
  code: Schema.Literal("skill_not_completed"),
  message: Schema.String,
})

export type SkillNotCompletedError = typeof skillNotCompletedErrorSchema.Type
