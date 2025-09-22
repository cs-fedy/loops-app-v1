import { Schema } from "effect"
import type { Effect } from "effect"
import { invalidOperationErrorSchema } from "@/modules/shared/domain/errors/invalid-operation"
import { invalidInputFactory } from "@/modules/shared/domain/utils/invalid-input"
import { instance } from "@/modules/shared/utils/axios"
import { parseApiResponse } from "@/modules/shared/utils/parse-api-response"
import {
  successMessageSchema,
  successMessageWithPayloadSchemaFactory,
} from "@/modules/shared/domain/types/success-message"
import { invalidExpiredTokenErrorSchema } from "@/modules/shared/domain/errors/invalid-expired-token"
import { userNotFoundErrorSchema } from "@/modules/shared/domain/errors/user-not-found"

export const requestConfirmErrorsSchema = Schema.Union(
  invalidInputFactory(
    Schema.Struct({
      authorization: Schema.optional(Schema.String),
      userId: Schema.optional(Schema.String),
    }),
  ),
  invalidExpiredTokenErrorSchema,
  userNotFoundErrorSchema,
  invalidOperationErrorSchema,
)

export type RequestConfirmErrors = typeof requestConfirmErrorsSchema.Type

export const requestConfirmSuccessSchema =
  successMessageWithPayloadSchemaFactory(
    Schema.Struct({ expiresAt: Schema.DateFromString }),
  )

type RequestConfirmResult = Effect.Effect<
  RequestConfirmSuccess,
  RequestConfirmErrors
>
type RequestConfirmSuccess = typeof requestConfirmSuccessSchema.Type

export const requestConfirmExitSchema = Schema.Exit({
  defect: Schema.String,
  failure: requestConfirmErrorsSchema,
  success: requestConfirmSuccessSchema,
})

export function requestConfirm(): RequestConfirmResult {
  const response = instance.post("/account/request")

  return parseApiResponse({
    error: {
      name: "RequestConfirmErrors",
      schema: requestConfirmErrorsSchema,
    },
    name: "RequestConfirm",
    success: {
      name: "RequestConfirmSuccess",
      schema: requestConfirmSuccessSchema,
    },
  })(response)
}
