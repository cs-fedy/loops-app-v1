import { Schema } from "effect"
import { textContentSchema } from "../value_objects/text-content"

export const quizSchema = Schema.Struct({
  quizId: Schema.String,
  slug: Schema.String,
  label: Schema.Array(textContentSchema),
  metaTags: Schema.Array(Schema.String),
  defaultLanguage: Schema.String,
  score: Schema.Number.pipe(Schema.int()),
  totalTime: Schema.Number.pipe(Schema.int()),
  difficulty: Schema.Number.pipe(Schema.int()),
  questionsCount: Schema.Number.pipe(Schema.int()),
  easyQuestionsCount: Schema.Number.pipe(Schema.int()),
  mediumQuestionsCount: Schema.Number.pipe(Schema.int()),
  hardQuestionsCount: Schema.Number.pipe(Schema.int()),
  status: Schema.String,
  createdAt: Schema.DateFromString,
  updatedAt: Schema.DateFromString,
})

export type Quiz = typeof quizSchema.Type