import { Schema } from "effect"
import { textContentSchema } from "../value_objects/text-content"

export const dragDropSchema = Schema.Struct({
  version: Schema.Number.pipe(Schema.int()),
  dragDropId: Schema.String,
  headline: Schema.Array(textContentSchema),
  choices: Schema.Array(Schema.Array(textContentSchema)),
  incompleteText: Schema.Array(textContentSchema),
  correctAnswer: Schema.Array(textContentSchema),
  metaTags: Schema.Array(Schema.String),
  defaultLanguage: Schema.String,
  difficulty: Schema.Number.pipe(Schema.int()),
  score: Schema.Number.pipe(Schema.int()),
  estimatedTime: Schema.Number.pipe(Schema.int()),
  status: Schema.String,
  createdAt: Schema.DateFromString,
})

export type DragDrop = typeof dragDropSchema.Type