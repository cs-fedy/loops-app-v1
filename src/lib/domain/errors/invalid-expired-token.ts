import { z } from "zod"

export const invalidExpiredTokenErrorSchema = z.object({
  code: z.literal("invalid_token"),
  message: z.string(),
})

export type InvalidExpiredTokenError = z.infer<
  typeof invalidExpiredTokenErrorSchema
>
