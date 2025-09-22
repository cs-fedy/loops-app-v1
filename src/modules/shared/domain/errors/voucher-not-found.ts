import { Schema } from "effect"

export const voucherNotFoundErrorSchema = Schema.Struct({
  code: Schema.Literal("voucher_not_found"),
  message: Schema.String,
})

export type VoucherNotFoundError = typeof voucherNotFoundErrorSchema.Type
