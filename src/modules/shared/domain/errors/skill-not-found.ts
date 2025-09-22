import { Schema } from "effect"
import { HttpStatus } from "./category-not-found"

export const skillNotFoundErrorSchema = Schema.Struct({
  code: Schema.Literal("skill_not_found"),
  status: Schema.Literal(HttpStatus.NOT_FOUND),
  message: Schema.String,
})

export type SkillNotFoundError = typeof skillNotFoundErrorSchema.Type