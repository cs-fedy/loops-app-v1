import { useQueryClient } from "@tanstack/react-query"
import { useServerFn } from "@tanstack/react-start"
import { useCallback } from "react"
import type { StartSkillWire } from "./start-skill-fn.server"
import { startSkillFn } from "./start-skill-fn.server"

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
          queryKey: ["single-category-item", categoryId, skillId],
        })
      }

      return response
    },
    [startSkillServer, queryClient],
  )

  return { handleStartSkill }
}
