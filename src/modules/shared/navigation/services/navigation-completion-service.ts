import type { CategoryContentItem } from "@/modules/shared/domain/entities/category-content-item"
import { useStartQuiz } from "@/modules/shared/shell/category_selection/services/use-start-quiz"
import { useStartSkill } from "@/modules/shared/shell/category_selection/services/use-start-skill"
import {
  QuizCompletionService,
  type IQuizCompletionService,
} from "./quiz-completion-service"
import {
  SkillCompletionService,
  type ISkillCompletionService,
} from "./skill-completion-service"

export interface INavigationCompletionService {
  validateAndStartItem(item: CategoryContentItem): Promise<boolean>
  isItemCompleted(item: CategoryContentItem): boolean
  canStartItem(item: CategoryContentItem): boolean
}

export class NavigationCompletionService
  implements INavigationCompletionService
{
  private skillCompletionService: ISkillCompletionService
  private quizCompletionService: IQuizCompletionService

  constructor(
    startSkillHook: ReturnType<typeof useStartSkill>,
    startQuizHook: ReturnType<typeof useStartQuiz>,
  ) {
    this.skillCompletionService = new SkillCompletionService(startSkillHook)
    this.quizCompletionService = new QuizCompletionService(startQuizHook)
  }

  async validateAndStartItem(item: CategoryContentItem): Promise<boolean> {
    if (item.contentType === "skills")
      return this.skillCompletionService.validateAndStartItem(item)

    if (item.contentType === "quizzes")
      return this.quizCompletionService.validateAndStartItem(item)

    return false
  }

  isItemCompleted(item: CategoryContentItem): boolean {
    if (item.contentType === "skills")
      return this.skillCompletionService.isItemCompleted(item)

    if (item.contentType === "quizzes")
      return this.quizCompletionService.isItemCompleted(item)

    return false
  }

  canStartItem(item: CategoryContentItem): boolean {
    if (item.contentType === "skills")
      return this.skillCompletionService.canStartItem(item)

    if (item.contentType === "quizzes")
      return this.quizCompletionService.canStartItem(item)

    return false
  }
}
