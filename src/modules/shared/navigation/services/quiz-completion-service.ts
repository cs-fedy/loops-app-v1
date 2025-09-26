import type { CategoryContentItem } from "@/modules/shared/domain/entities/category-content-item"
import { useStartQuiz } from "@/modules/shared/shell/category_selection/services/use-start-quiz"

export interface IQuizCompletionService {
  validateAndStartItem(item: CategoryContentItem): Promise<boolean>
  isItemCompleted(item: CategoryContentItem): boolean
  canStartItem(item: CategoryContentItem): boolean
  isItemStarted(item: CategoryContentItem): boolean
}

export class QuizCompletionService implements IQuizCompletionService {
  constructor(private startQuizHook: ReturnType<typeof useStartQuiz>) {}

  async validateAndStartItem(item: CategoryContentItem): Promise<boolean> {
    if (item.contentType !== "quizzes") return false

    // If item is already completed or started, it's valid
    if (this.isItemCompleted(item) || this.isItemStarted(item)) return true

    // If item can't be started, it's not valid
    if (!this.canStartItem(item)) return false

    const response = await this.startQuizHook.handleStartQuiz(
      item.categoryId,
      item.itemId,
    )

    return response._tag === "Success"
  }

  isItemCompleted(item: CategoryContentItem): boolean {
    if (item.contentType !== "quizzes") return false
    return item.startedQuiz?.status === "completed"
  }

  canStartItem(item: CategoryContentItem): boolean {
    if (item.contentType !== "quizzes") return false

    // This logic should match the existing logic in the circle components
    // For now, we'll assume items can be started if they're not completed
    return !this.isItemCompleted(item)
  }

  isItemStarted(item: CategoryContentItem): boolean {
    if (item.contentType !== "quizzes") return false

    return !!item.startedQuiz && item.startedQuiz.status !== "completed"
  }
}
