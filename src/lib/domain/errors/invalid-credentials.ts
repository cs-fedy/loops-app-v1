import { z } from "zod"

export const invalidCredentialsErrorSchema = z.object({
  code: z.literal("invalid_credentials"),
  message: z.string(),
})

export type InvalidCredentialsError = z.infer<
  typeof invalidCredentialsErrorSchema
>
