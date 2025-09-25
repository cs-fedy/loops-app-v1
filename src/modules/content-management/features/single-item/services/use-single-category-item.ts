import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { singleCategoryItemFn } from "./single-category-item-fn.server"

interface SingleCategoryItemParams {
  categoryId: string
  itemId: string
}

export const singleCategoryItemQuery = (params: SingleCategoryItemParams) =>
  queryOptions({
    queryKey: ["single-category-item", params.categoryId, params.itemId],
    queryFn: async () => {
      const response = await singleCategoryItemFn({
        data: {
          categoryId: params.categoryId,
          itemId: params.itemId,
        },
      })
      if (response._tag === "Failure") {
        const message = `Failed to fetch category item: ${response.error.message}`
        throw new Error(message)
      }
      return response.value
    },
  })

export function useSingleCategoryItem(params: SingleCategoryItemParams) {
  const { data } = useSuspenseQuery(singleCategoryItemQuery(params))
  return { categoryItem: data.categoryItem }
}