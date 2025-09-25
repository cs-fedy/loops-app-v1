import { QuizContentScreen } from "@/modules/learning-experience/shell/components/quiz-content-screen"
import { SkillContentScreen } from "@/modules/learning-experience/shell/components/skill-content-screen"
import type { CategoryContentItem } from "@/modules/shared/domain/entities/category-content-item"
import { useCanGoBack, useRouter } from "@tanstack/react-router"

type SelectedContentScreenProps = {
  selectedItem: CategoryContentItem
}

export function SelectedContentScreen({
  selectedItem,
}: SelectedContentScreenProps) {
  const router = useRouter()
  const canGoBack = useCanGoBack()

  const handleBackNavigation = () => {
    if (!canGoBack) router.navigate({ to: "/" })
    else router.history.back()
  }

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
