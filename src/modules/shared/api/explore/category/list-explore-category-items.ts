import { categoryItemSchema } from "@/modules/shared/domain/entities/category-item"
import { categoryNotFoundErrorSchema } from "@/modules/shared/domain/errors/category-not-found"
import { invalidExpiredTokenErrorSchema } from "@/modules/shared/domain/errors/invalid-expired-token"
import { userNotFoundErrorSchema } from "@/modules/shared/domain/errors/user-not-found"
import { invalidInputFactory } from "@/modules/shared/domain/utils/invalid-input"
import { instance } from "@/modules/shared/utils/axios"
import { parseApiResponse } from "@/modules/shared/utils/parse-api-response"
import { parseEffectSchema } from "@/modules/shared/utils/parse-effect-schema"
import type { Effect } from "effect"
import { Schema } from "effect"

const listExploreCategoryItemsArgsSchema = Schema.Struct({
  categoryId: Schema.String,
})

const listExploreCategoryItemsQuerySchema = Schema.Struct({
  offset: Schema.optional(Schema.Number.pipe(Schema.int())),
  size: Schema.optional(Schema.Number.pipe(Schema.int())),
})

type ListExploreCategoryItemsArgs =
  typeof listExploreCategoryItemsArgsSchema.Type
export type ListExploreCategoryItemsQuery =
  typeof listExploreCategoryItemsQuerySchema.Type

export const listExploreCategoryItemsErrorsSchema = Schema.Union(
  invalidInputFactory(
    Schema.Struct({
      authorization: Schema.optional(Schema.String),
      userId: Schema.optional(Schema.String),
      size: Schema.optional(Schema.String),
      offset: Schema.optional(Schema.String),
    }),
  ),
  categoryNotFoundErrorSchema,
  invalidExpiredTokenErrorSchema,
  userNotFoundErrorSchema,
)

export type ListExploreCategoryItemsErrors =
  typeof listExploreCategoryItemsErrorsSchema.Type

export const listExploreCategoryItemsSuccessSchema = Schema.Struct({
  categoryItems: Schema.Array(categoryItemSchema),
})

export type ListExploreCategoryItemsSuccess =
  typeof listExploreCategoryItemsSuccessSchema.Type

type ListExploreCategoryItemsResult = Effect.Effect<
  ListExploreCategoryItemsSuccess,
  ListExploreCategoryItemsErrors
>

export const listExploreCategoryItemsExitSchema = Schema.Exit({
  defect: Schema.String,
  failure: listExploreCategoryItemsErrorsSchema,
  success: listExploreCategoryItemsSuccessSchema,
})

export function listExploreCategoryItems(
  args: ListExploreCategoryItemsArgs,
  queryParams?: ListExploreCategoryItemsQuery,
): ListExploreCategoryItemsResult {
  const parsedArgs = parseEffectSchema(listExploreCategoryItemsArgsSchema, args)

  const params = new URLSearchParams()

  if (queryParams?.offset !== undefined)
    params.append("offset", queryParams.offset.toString())
  if (queryParams?.size !== undefined)
    params.append("size", queryParams.size.toString())

  const queryString = params.toString()
  const url = queryString
    ? `/explore/categories/${parsedArgs.categoryId}/items?${queryString}`
    : `/explore/categories/${parsedArgs.categoryId}/items`

  const response = instance.get(url)

  return parseApiResponse({
    error: {
      name: "ListExploreCategoryItemsErrors",
      schema: listExploreCategoryItemsErrorsSchema,
    },
    name: "ListExploreCategoryItems",
    success: {
      name: "ListExploreCategoryItemsSuccess",
      schema: listExploreCategoryItemsSuccessSchema,
    },
  })(response)
}
