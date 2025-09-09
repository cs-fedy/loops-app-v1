import z from "zod"
import type { Effect } from "effect"
import { invalidCredentialsErrorSchema } from "@/lib/domain/errors/invalid-credentials"
import { invalidInputFactory } from "@/lib/domain/utils/invalid-input"
import { loginTokensSchema } from "@/lib/domain/types/login-tokens"
import { parseZodSchema } from "@/lib/utils/parse-zod-schema"
import { instance } from "@/lib/utils/axios"
import { parseApiResponse } from "@/lib/utils/parse-api-response"

const loginArgsSchema = z.object({
  password: z.string(),
  username: z.string(),
})

type LoginArgs = z.infer<typeof loginArgsSchema>

const loginErrorsSchema = z.discriminatedUnion("code", [
  invalidInputFactory(
    z.object({
      password: z.string().optional(),
      username: z.string().optional(),
    }),
  ),
  invalidCredentialsErrorSchema,
])

export type LoginErrors = z.infer<typeof loginErrorsSchema>

const loginSuccessSchema = loginTokensSchema
type LoginResult = Effect.Effect<LoginSuccess, LoginErrors>
type LoginSuccess = z.infer<typeof loginSuccessSchema>

export function login(args: LoginArgs): LoginResult {
  const parsedArgs = parseZodSchema({
    name: "LoginArgs",
    schema: loginArgsSchema,
  })(args)

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
