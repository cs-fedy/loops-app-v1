import { Schema } from "effect"

export const skillAlreadyCompletedErrorSchema = Schema.Struct({
  code: Schema.Literal("skill_already_completed"),
  message: Schema.String,
})

export type SkillAlreadyCompletedError = typeof skillAlreadyCompletedErrorSchema.Type