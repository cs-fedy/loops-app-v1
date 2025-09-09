import { z } from "zod"

export const userNotFoundErrorSchema = z.object({
  code: z.literal("user_not_found"),
  message: z.string(),
})

export type UserNotFoundError = z.infer<typeof userNotFoundErrorSchema>
