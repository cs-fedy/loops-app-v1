import { Schema } from "effect"

export enum HttpStatus {
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
}

export const categoryNotFoundErrorSchema = Schema.Struct({
  code: Schema.Literal("category_not_found"),
  status: Schema.Literal(HttpStatus.NOT_FOUND),
  message: Schema.String,
})

export type CategoryNotFoundError = typeof categoryNotFoundErrorSchema.Type