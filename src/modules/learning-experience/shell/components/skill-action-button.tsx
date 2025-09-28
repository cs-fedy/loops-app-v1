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

  const { navigateToNext, canNavigateNext, exitContent, validateAndStartItem } =
    useContentNavigation({ categoryId: skillItem.categoryId })

  const [isLoading, setIsLoading] = useState(false)

  // Check if current item is started (has completedSkill but not completed)
  const isStarted =
    skillItem.completedSkill && !skillItem.completedSkill.isCompleted

  // Check if current item is completed
  const isCompleted =
    skillItem.completedSkill && skillItem.completedSkill.isCompleted

  const validateSkill = async () => {
    setIsLoading(true)

    const response = await handleCompleteSkill({
      categoryId: skillItem.categoryId,
      skillId: skillItem.itemId,
    })

    setIsLoading(false)

    if (response._tag === "Success") {
      success("Skill completed successfully!")
    } else {
      error("Failed to complete skill")
    }
  }

  const handleCompletedItemClick = async () => {
    setIsLoading(true)

    // Check if we can navigate to next item
    const canNavigate = await canNavigateNext()

    if (canNavigate) {
      // Normal navigation - next item is already started
      setIsLoading(false)
      return await navigateToNext()
    }

    // Try to start the next item and navigate to it
    const isSuccess = await validateAndStartItem()

    setIsLoading(false)

    // Successfully started next item, now navigate
    if (isSuccess) await navigateToNext()
    // No next item available or failed to start, exit content
    else exitContent()
  }

  const handleButtonClick = () => {
    if (isCompleted) handleCompletedItemClick()
    else if (isStarted) validateSkill()
  }

  return (
    <button
      onClick={handleButtonClick}
      disabled={isLoading}
      className="font-outfit w-full max-w-sm rounded-xl bg-cyan-400 px-6 py-3 text-lg font-medium text-white transition-all duration-200 hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isLoading ? "Loading..." : isCompleted ? "Next" : "Validate"}
    </button>
  )
}
