export const unknownErrorSchema = Schema.Struct({
  code: Schema.Literal("UnknownError"),
  message: Schema.String,
})
