import { Schema } from "effect"

export const subQuizSchema = Schema.Struct({
  subQuizId: Schema.String,
  quizId: Schema.String,
  questionId: Schema.String,
  questionType: Schema.String,
  isDeleted: Schema.Boolean,
  previousSubQuiz: Schema.optional(Schema.String),
  nextSubQuiz: Schema.optional(Schema.String),
  deletedAt: Schema.optional(Schema.DateFromString),
})

export type SubQuiz = Schema.Schema.Type<typeof subQuizSchema>