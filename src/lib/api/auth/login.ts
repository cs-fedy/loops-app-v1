import { Schema } from "effect"
import type { Effect } from "effect"
import { invalidCredentialsErrorSchema } from "@/lib/domain/errors/invalid-credentials"
import { invalidInputFactory } from "@/lib/domain/utils/invalid-input"
import { loginTokensSchema } from "@/lib/domain/types/login-tokens"
import { parseEffectSchema } from "@/lib/utils/parse-effect-schema"
import { instance } from "@/lib/utils/axios"
import { parseApiResponse } from "@/lib/utils/parse-api-response"

const loginArgsSchema = Schema.Struct({
  password: Schema.String,
  username: Schema.String,
})

type LoginArgs = typeof loginArgsSchema.Type

export const loginErrorsSchema = Schema.Union(
  invalidInputFactory(
    Schema.Struct({
      password: Schema.optional(Schema.String),
      username: Schema.optional(Schema.String),
    }),
  ),
  invalidCredentialsErrorSchema,
)

export type LoginErrors = typeof loginErrorsSchema.Type

export const loginSuccessSchema = loginTokensSchema
type LoginResult = Effect.Effect<LoginSuccess, LoginErrors>
type LoginSuccess = typeof loginSuccessSchema.Type

export const loginExitSchema = Schema.Exit({
  defect: Schema.String,
  failure: loginErrorsSchema,
  success: loginSuccessSchema,
})

export function login(args: LoginArgs): LoginResult {
  const parsedArgs = parseEffectSchema(loginArgsSchema, args)
  const response = instance.post("/auth/login", parsedArgs)

  return parseApiResponse({
    error: {
      name: "LoginErrors",
      schema: loginErrorsSchema,
    },
    name: "Login",
    success: {
      name: "LoginSuccess",
      schema: loginTokensSchema,
    },
  })(response)
}
