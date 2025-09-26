import { QuizContentScreen } from "@/modules/learning-experience/shell/components/quiz-content-screen"
import { SkillContentScreen } from "@/modules/learning-experience/shell/components/skill-content-screen"
import type { CategoryContentItem } from "@/modules/shared/domain/entities/category-content-item"
import { useContentNavigation } from "@/modules/shared/navigation"

type SelectedContentScreenProps = {
  selectedItem: CategoryContentItem
}

export function SelectedContentScreen({
  selectedItem,
}: SelectedContentScreenProps) {
  const { handleBackNavigation } = useContentNavigation({
    categoryId: selectedItem.categoryId,
  })

  return (
    <div className="relative flex-1 overflow-hidden">
      {selectedItem.contentType === "skills" && (
        <SkillContentScreen
          skillItem={selectedItem}
          onBack={handleBackNavigation}
        />
      )}

      {selectedItem.contentType === "quizzes" && (
        <QuizContentScreen
          quizItem={selectedItem}
          onBack={handleBackNavigation}
        />
      )}
    </div>
  )
}
