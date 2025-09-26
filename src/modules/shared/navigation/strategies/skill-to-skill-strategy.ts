import type { CategoryContentItem } from "@/modules/shared/domain/entities/category-content-item"
import { Effect } from "effect"
import type {
  NavigationContext,
  NavigationError,
} from "../types/navigation-types"
import { BaseNavigationStrategy } from "./base-navigation-strategy"

export class SkillToSkillStrategy extends BaseNavigationStrategy {
  canNavigate(context: NavigationContext): boolean {
    const { currentItem, direction } = context
    return (
      currentItem.contentType === "skills" &&
      direction === "next" &&
      this.validateCompletion(currentItem)
    )
  }

  navigate(
    context: NavigationContext,
  ): Effect.Effect<CategoryContentItem, NavigationError> {
    const { currentItem, adjacentItem } = context

    if (!this.canNavigate(context))
      return Effect.fail({
        _tag: "ValidationFailed" as const,
        message: "Cannot navigate from skill to skill",
      })

    if (!adjacentItem)
      return Effect.fail({
        _tag: "FetchError" as const,
        message: "Adjacent item not provided",
      })

    return Effect.gen(function* () {
      if (adjacentItem.contentType !== "skills") {
        yield* Effect.fail({
          _tag: "InvalidContentType" as const,
          message: "Expected next item to be a skill",
        })
      }

      return adjacentItem
    })
  }

  validateCompletion(item: CategoryContentItem): boolean {
    if (item.contentType !== "skills") return false
    return item.completedSkill?.isCompleted === true
  }
}
