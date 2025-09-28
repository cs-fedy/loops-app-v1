import { Schema } from "effect"

export const completedDragDropSchema = Schema.Struct({
  version: Schema.Number.pipe(Schema.int()),
  user: Schema.String,
  category: Schema.String,
  quiz: Schema.String,
  question: Schema.String,
  score: Schema.Number.pipe(Schema.int()),
  spentTime: Schema.Number.pipe(Schema.int()),
  status: Schema.String,
  createdAt: Schema.DateFromString,
  updatedAt: Schema.DateFromString,
  userAnswer: Schema.optional(Schema.String),
})

export type CompletedDragDrop = Schema.Schema.Type<typeof completedDragDropSchema>