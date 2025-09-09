import { z } from "zod"

export const loginTokensSchema = z.object({
  access: z.object({ expiresIn: z.coerce.number().int(), token: z.string() }),
  refresh: z.object({ expiresIn: z.coerce.date(), token: z.string() }),
})

export type LoginTokens = z.infer<typeof loginTokensSchema>
