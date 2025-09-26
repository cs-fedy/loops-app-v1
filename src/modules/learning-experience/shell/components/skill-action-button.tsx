import { CategoryContentItem } from "@/modules/shared/domain/entities/category-content-item"
import { useToast } from "@/modules/shared/hooks/use-toast"
import { useContentNavigation } from "@/modules/shared/navigation"
import { useCompleteSkill } from "@/modules/shared/shell/category_selection/hooks/use-complete-skill"
import { useState } from "react"

type SkillActionButtonProps = {
  skillItem: CategoryContentItem & { contentType: "skills" }
}

export function SkillActionButton({ skillItem }: SkillActionButtonProps) {
  const { handleCompleteSkill } = useCompleteSkill()
  const { success, error } = useToast()

  const { navigateToNext, canNavigateNext, exitContent } = useContentNavigation(
    { categoryId: skillItem.categoryId },
  )

  const [isLoading, setIsLoading] = useState(false)

  const isCompleted =
    skillItem.completedSkill && skillItem.completedSkill.isCompleted

  const handleNavigateNextItem = async () => {
    const canNavigate = await canNavigateNext()
    if (canNavigate) await navigateToNext()
    else exitContent()
  }

  const validateSkill = async () => {
    setIsLoading(true)

    const response = await handleCompleteSkill({
      categoryId: skillItem.categoryId,
      skillId: skillItem.itemId,
    })

    setIsLoading(false)

    if (response._tag === "Success") success("Skill completed successfully!")
    else error("Failed to complete skill")
  }

  return (
    <button
      onClick={() => {
        if (isCompleted) handleNavigateNextItem()
        else validateSkill()
      }}
      disabled={isLoading}
      className="font-outfit w-full max-w-sm rounded-xl bg-cyan-400 px-6 py-3 text-lg font-medium text-white transition-all duration-200 hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isLoading ? "Loading..." : isCompleted ? "Next" : "Validate"}
    </button>
  )
}
