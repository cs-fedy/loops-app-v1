import { useCallback } from "react"
import { useServerFn } from "@tanstack/react-start"
import { useQueryClient } from "@tanstack/react-query"
import { startSkillFn } from "./start-skill-fn.server"
import type { StartSkillWire } from "./start-skill-fn.server"

export function useStartSkill() {
  const startSkillServer = useServerFn(startSkillFn)
  const queryClient = useQueryClient()

  const handleStartSkill = useCallback(
    async (categoryId: string, skillId: string) => {
      // Call server function → returns JSON-safe union
      const response = (await startSkillServer({
        data: { categoryId, skillId },
      })) as StartSkillWire

      // If successful, invalidate relevant queries to refresh data
      if (response._tag === "Success") {
        await queryClient.invalidateQueries({
          queryKey: ["category-content", categoryId],
        })
        await queryClient.invalidateQueries({
          queryKey: ["explore-categories"],
        })
      }

      return response
    },
    [startSkillServer, queryClient],
  )

  return { handleStartSkill }
}