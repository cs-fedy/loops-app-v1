import { userNotFoundErrorSchema } from "src/lib/domain/errors/user-not-found"
import { invalidInputFactory } from "src/lib/domain/utils/invalid-input"
import { z } from "zod"
import { userSchema } from "../../domain/entities/user"
import { instance } from "../../utils/axios"
import { parseApiResponse } from "../../utils/parse-api-response"
import { invalidExpiredTokenErrorSchema } from "../../domain/errors/invalid-expired-token"
import type { Effect } from "effect"

const getLoggedUserErrorsSchema = z.discriminatedUnion("code", [
  invalidInputFactory(
    z.object({
      authorization: z.string().optional(),
      userId: z.string().optional(),
    }),
  ),
  invalidExpiredTokenErrorSchema,
  userNotFoundErrorSchema,
])

type GetLoggedUserErrors = z.infer<typeof getLoggedUserErrorsSchema>

type GetLoggedUserResult = Effect.Effect<
  GetLoggedUserSuccess,
  GetLoggedUserErrors
>

const getLoggedUserSuccessSchema = z.object({ user: userSchema })
type GetLoggedUserSuccess = z.infer<typeof getLoggedUserSuccessSchema>

export function getLoggedUser(
  providedAuthHeader?: string,
): GetLoggedUserResult {
  const response = instance.get("/users/logged", {
    headers: { Authorization: `Bearer ${providedAuthHeader}` },
  })

  return parseApiResponse({
    error: {
      name: "GetLoggedUserErrors",
      schema: getLoggedUserErrorsSchema,
    },
    name: "GetLoggedUser",
    success: {
      name: "GetLoggedUserSuccess",
      schema: getLoggedUserSuccessSchema,
    },
  })(response)
}
