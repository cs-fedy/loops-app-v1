import { Schema } from "effect"

export const successMessageSchema = Schema.Struct({
  isSuccess: Schema.Boolean,
  message: Schema.String,
})

export const successMessageWithPayloadSchemaFactory = <
  T extends Schema.Struct<any>,
>(
  payload: T,
) =>
  Schema.Struct({
    isSuccess: Schema.Boolean,
    message: Schema.String,
    payload,
  })
