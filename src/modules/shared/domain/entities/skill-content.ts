import { Schema } from "effect"
import { textContentSchema } from "../value_objects/text-content"

export const skillContentSchema = Schema.Struct({
  skill: Schema.String,
  version: Schema.Number.pipe(Schema.int()),
  contentURL: Schema.Array(textContentSchema),
  slug: Schema.String,
  label: Schema.Array(textContentSchema),
  metaTags: Schema.Array(Schema.String),
  defaultLanguage: Schema.String,
  difficulty: Schema.Number.pipe(Schema.int()),
  score: Schema.Number.pipe(Schema.int()),
  status: Schema.String,
  createdAt: Schema.DateFromString,
})

export type SkillContent = typeof skillContentSchema.Type