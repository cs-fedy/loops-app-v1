import { Schema } from "effect"

export const voucherSchema = Schema.Struct({
  voucherId: Schema.String,
  user: Schema.String,
  category: Schema.String,
  code: Schema.Number.pipe(Schema.int()),
  expiresIn: Schema.DateFromString,
  createdAt: Schema.DateFromString,
  updatedAt: Schema.DateFromString,
})

export type Voucher = typeof voucherSchema.Type
