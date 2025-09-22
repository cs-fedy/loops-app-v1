import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { exploreCategoriesFn } from "./explore-categories-fn.server"

export const exploreCategoriesQuery = queryOptions({
  queryFn: async () => {
    const response = await exploreCategoriesFn()
    if (response._tag === "Failure") {
      const message = `Failed to fetch explore categories: ${response.error.message}`
      throw new Error(message)
    }

    return response.value
  },
  queryKey: ["explore-categories"],
})

export function useExploreCategories() {
  const {
    data: { categories },
  } = useSuspenseQuery(exploreCategoriesQuery)
  return { categories }
}
