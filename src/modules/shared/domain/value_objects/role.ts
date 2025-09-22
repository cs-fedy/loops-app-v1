import { Schema } from "effect"

export const roleSchema = Schema.Literal("admin", "content_creator", "user")

export type Role = typeof roleSchema.Type
