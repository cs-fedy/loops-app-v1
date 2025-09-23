import { CategoryContentItem } from "@/modules/content-management/features/content-list/services/category-content-fn.server"
import { ProgressState } from "@/modules/shared/utils/types"
import { QuizCard } from "./quiz-card"
import { SkillCard } from "./skill-card"

type CategoryItemCardProps = {
  item: CategoryContentItem
  index: number
}

export function CategoryItemCard({ item, index }: CategoryItemCardProps) {
  const getProgressState = (): ProgressState => {
    if (item.contentType === "skills") {
      if (item.completedSkill?.isCompleted) return "completed"
      if (item.completedSkill) return "started"
      return "locked"
    } else {
      // For quizzes
      if (item.startedQuiz?.status === "completed") return "completed"
      if (item.startedQuiz) return "started"
      return "locked"
    }
  }

  const getProgress = (): number => {
    if (item.contentType === "skills") {
      if (item.completedSkill?.isCompleted) return 100
      // Calculate progress based on score (assuming max score is 100)
      if (item.completedSkill) return Math.min(item.completedSkill.score, 100)
      return 0
    } else {
      // For quizzes
      if (item.startedQuiz?.status === "completed") return 100
      // Calculate progress based on completed questions
      if (item.startedQuiz && item.content.questionsCount > 0)
        return Math.round(
          (item.startedQuiz.completedQuestions / item.content.questionsCount) *
            100,
        )
      return 0
    }
  }

  const progressState = getProgressState()
  const progress = getProgress()

  if (item.contentType === "skills") {
    return (
      <SkillCard
        item={item}
        index={index}
        progressState={progressState}
        progress={progress}
      />
    )
  }

  return (
    <QuizCard
      item={item}
      index={index}
      progressState={progressState}
      progress={progress}
    />
  )
}
