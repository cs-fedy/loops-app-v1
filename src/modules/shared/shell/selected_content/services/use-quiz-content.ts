import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { getQuizContentFn } from "./get-quiz-content-fn.server"

interface QuizContentParams {
  categoryId: string
  quizId: string
}

export const quizContentQuery = (params: QuizContentParams) =>
  queryOptions({
    queryKey: ["quiz-content", params.categoryId, params.quizId],
    queryFn: async () => {
      const response = await getQuizContentFn({
        data: {
          categoryId: params.categoryId,
          quizId: params.quizId,
        },
      })

      if (response._tag === "Failure") {
        const message = `Failed to fetch quiz content: ${response.error.message}`
        throw new Error(message)
      }

      return response.value
    },
  })

export function useQuizContent(params: QuizContentParams) {
  const { data } = useSuspenseQuery(quizContentQuery(params))
  return { subQuizzes: data.subQuizzes }
}
