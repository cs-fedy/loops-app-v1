import { z } from "zod"

export const roleSchema = z.enum(["admin", "content_creator", "user"])

export type Role = z.infer<typeof roleSchema>
