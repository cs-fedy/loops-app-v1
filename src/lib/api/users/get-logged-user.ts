import { userNotFoundErrorSchema } from "src/lib/domain/errors/user-not-found"
import { invalidInputFactory } from "src/lib/domain/utils/invalid-input"
import { Schema } from "effect"
import { userSchema } from "../../domain/entities/user"
import { instance } from "../../utils/axios"
import { parseApiResponse } from "../../utils/parse-api-response"
import { invalidExpiredTokenErrorSchema } from "../../domain/errors/invalid-expired-token"
import type { Effect } from "effect"

export const getLoggedUserErrorsSchema = Schema.Union(
  invalidInputFactory(
    Schema.Struct({
      authorization: Schema.optional(Schema.String),
      userId: Schema.optional(Schema.String),
    }),
  ),
  invalidExpiredTokenErrorSchema,
  userNotFoundErrorSchema,
)

export type GetLoggedUserErrors = typeof getLoggedUserErrorsSchema.Type

type GetLoggedUserResult = Effect.Effect<
  GetLoggedUserSuccess,
  GetLoggedUserErrors
>

export const getLoggedUserSuccessSchema = Schema.Struct({ user: userSchema })
export type GetLoggedUserSuccess = typeof getLoggedUserSuccessSchema.Type

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
