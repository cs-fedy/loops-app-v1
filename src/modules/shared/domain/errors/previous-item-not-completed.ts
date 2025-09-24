import { Schema } from "effect"

export const previousItemNotCompletedErrorSchema = Schema.Struct({
  code: Schema.Literal("previous_item_not_completed"),
  message: Schema.String,
})

export type PreviousItemNotCompletedError = typeof previousItemNotCompletedErrorSchema.Type