import { Schema } from "effect"

export const invalidExpiredVoucherErrorSchema = Schema.Struct({
  code: Schema.Literal("invalid_expired_voucher"),
  message: Schema.String,
})

export type InvalidExpiredVoucherError =
  typeof invalidExpiredVoucherErrorSchema.Type
