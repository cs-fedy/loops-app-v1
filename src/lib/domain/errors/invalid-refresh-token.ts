import { z } from "zod"

export const invalidRefreshTokenErrorSchema = z.object({
  code: z.literal("invalid_refresh_token"),
  message: z.string(),
})

export type InvalidRefreshTokenError = z.infer<
  typeof invalidRefreshTokenErrorSchema
>
