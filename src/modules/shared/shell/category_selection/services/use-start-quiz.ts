import { useQueryClient } from "@tanstack/react-query"
import { useServerFn } from "@tanstack/react-start"
import { useCallback } from "react"
import type { StartQuizWire } from "./start-quiz-fn.server"
import { startQuizFn } from "./start-quiz-fn.server"

export function useStartQuiz() {
  const startQuizServer = useServerFn(startQuizFn)
  const queryClient = useQueryClient()

  const handleStartQuiz = useCallback(
    async (categoryId: string, quizId: string) => {
      // Call server function → returns JSON-safe union
      const response = (await startQuizServer({
        data: { categoryId, quizId },
      })) as StartQuizWire

      // If successful, invalidate relevant queries to refresh data
      if (response._tag === "Success") {
        await queryClient.invalidateQueries({
          queryKey: ["single-category-item", categoryId, quizId],
        })
      }

      return response
    },
    [startQuizServer, queryClient],
  )

  return { handleStartQuiz }
}
