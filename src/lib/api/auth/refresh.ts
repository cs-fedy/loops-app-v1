import { z } from "zod"
import { loginTokensSchema } from "src/lib/domain/types/login-tokens"
import { invalidInputFactory } from "../../domain/utils/invalid-input"
import { invalidRefreshTokenErrorSchema } from "../../domain/errors/invalid-refresh-token"
import { userNotFoundErrorSchema } from "../../domain/errors/user-not-found"
import { instance } from "../../utils/axios"
import { parseZodSchema } from "../../utils/parse-zod-schema"
import { parseApiResponse } from "../../utils/parse-api-response"
import type { Effect } from "effect"

const refreshArgsSchema = z.object({ refresh: z.string() }).optional()
type RefreshArgs = z.infer<typeof refreshArgsSchema>

const refreshErrorsSchema = z.discriminatedUnion("code", [
  invalidInputFactory(z.object({ refreshToken: z.string().optional() })),
  invalidRefreshTokenErrorSchema,
  userNotFoundErrorSchema,
])

const refreshSuccessSchema = loginTokensSchema
type RefreshErrors = z.infer<typeof refreshErrorsSchema>
type RefreshResult = Effect.Effect<RefreshSuccess, RefreshErrors>
type RefreshSuccess = z.infer<typeof refreshSuccessSchema>

export function refreshAccessToken(args?: RefreshArgs): RefreshResult {
  const parsedArgs = parseZodSchema({
    name: "RefreshArgs",
    schema: refreshArgsSchema,
  })(args)

  const cookie = parsedArgs ? `refresh=${parsedArgs.refresh}` : ""
  const response = instance.post("/auth/refresh", { Cookie: cookie })

  return parseApiResponse({
    error: {
      name: "RefreshErrors",
      schema: refreshErrorsSchema,
    },
    name: "Refresh",
    success: {
      name: "RefreshSuccess",
      schema: refreshSuccessSchema,
    },
  })(response)
}
