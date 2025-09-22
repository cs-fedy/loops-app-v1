import { Schema } from "effect"
import { HttpStatus } from "./category-not-found"

export const categoryNotStartedErrorSchema = Schema.Struct({
  code: Schema.Literal("category_not_started"),
  status: Schema.Literal(HttpStatus.BAD_REQUEST),
  message: Schema.String,
})

export type CategoryNotStartedError = typeof categoryNotStartedErrorSchema.Type