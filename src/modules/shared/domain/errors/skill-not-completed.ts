import { Schema } from "effect"
import { HttpStatus } from "./category-not-found"

export const skillNotCompletedErrorSchema = Schema.Struct({
  code: Schema.Literal("skill_not_completed"),
  status: Schema.Literal(HttpStatus.BAD_REQUEST),
  message: Schema.String,
})

export type SkillNotCompletedError = typeof skillNotCompletedErrorSchema.Type
