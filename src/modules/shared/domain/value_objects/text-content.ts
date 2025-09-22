import { Schema } from "effect"

export const textContentSchema = Schema.Struct({
  language: Schema.String,
  content: Schema.String,
})

export type TextContent = typeof textContentSchema.Type
