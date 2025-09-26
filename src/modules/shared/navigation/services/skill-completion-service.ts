import type { CategoryContentItem } from "@/modules/shared/domain/entities/category-content-item"
import { useStartSkill } from "@/modules/shared/shell/category_selection/services/use-start-skill"

export interface ISkillCompletionService {
  validateAndStartItem(item: CategoryContentItem): Promise<boolean>
  isItemCompleted(item: CategoryContentItem): boolean
  canStartItem(item: CategoryContentItem): boolean
  isItemStarted(item: CategoryContentItem): boolean
}

export class SkillCompletionService implements ISkillCompletionService {
  constructor(private startSkillHook: ReturnType<typeof useStartSkill>) {}

  async validateAndStartItem(item: CategoryContentItem): Promise<boolean> {
    if (item.contentType !== "skills") return false

    // If item is already completed or started, it's valid
    if (this.isItemCompleted(item) || this.isItemStarted(item)) return true

    // If item can't be started, it's not valid
    if (!this.canStartItem(item)) return false

    const response = await this.startSkillHook.handleStartSkill({
      categoryId: item.categoryId,
      skillId: item.itemId,
    })

    return response._tag === "Success"
  }

  isItemCompleted(item: CategoryContentItem): boolean {
    if (item.contentType !== "skills") return false
    return item.completedSkill?.isCompleted === true
  }

  canStartItem(item: CategoryContentItem): boolean {
    if (item.contentType !== "skills") return false

    // This logic should match the existing logic in the circle components
    // For now, we'll assume items can be started if they're not completed
    return !this.isItemCompleted(item)
  }

  isItemStarted(item: CategoryContentItem): boolean {
    if (item.contentType !== "skills") return false
    return !!item.completedSkill && !item.completedSkill.isCompleted
  }
}
