import { CategoryContentItem } from "@/modules/content-management/features/content-list/services/category-content-fn.server"
import { ProgressState } from "@/modules/shared/utils/types"
import { QuizCard } from "./quiz-card"
import { SkillCard } from "./skill-card"

type CategoryItemCardProps = {
  item: CategoryContentItem
  index: number
  onClick: () => void
}

export function CategoryItemCard({
  item,
  index,
  onClick,
}: CategoryItemCardProps) {
  const getProgressState = (index: number): ProgressState => {
    if (index === 0) return "completed"
    if (index === 1) return "started"
    return "locked"
  }

  const getProgress = (index: number): number => {
    if (index === 0) return 100
    if (index === 1) return 70
    return 0
  }

  const progressState = getProgressState(index)
  const progress = getProgress(index)

  if (item.contentType === "skills") {
    return (
      <SkillCard
        item={item}
        index={index}
        progressState={progressState}
        progress={progress}
        onClick={onClick}
      />
    )
  }

  return (
    <QuizCard
      item={item}
      index={index}
      progressState={progressState}
      progress={progress}
      onClick={onClick}
    />
  )
}
