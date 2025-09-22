import { Schema } from "effect"
import { textContentSchema } from "../value_objects/text-content"

export const skillSchema = Schema.Struct({
  skillId: Schema.String,
  label: Schema.Array(textContentSchema),
  metaTags: Schema.Array(Schema.String),
  defaultLanguage: Schema.String,
  recentContentVersion: Schema.Number.pipe(Schema.int()),
  createdAt: Schema.DateFromString,
  updatedAt: Schema.DateFromString,
})

export type Skill = typeof skillSchema.Type
