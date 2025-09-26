import type { CategoryContentItem } from "@/modules/shared/domain/entities/category-content-item"
import { Effect } from "effect"
import {
  QuizToQuizStrategy,
  QuizToSkillStrategy,
  SkillToQuizStrategy,
  SkillToSkillStrategy,
} from "../strategies"
import type {
  INavigationStrategy,
  NavigationError,
  NavigationStrategyType,
  StrategyPayload,
} from "../types/navigation-types"

export class OptimizedStrategySelector {
  private strategies: Map<NavigationStrategyType, INavigationStrategy>

  constructor() {
    this.strategies = new Map([
      ["skill-to-skill", new SkillToSkillStrategy()],
      ["skill-to-quiz", new SkillToQuizStrategy()],
      ["quiz-to-skill", new QuizToSkillStrategy()],
      ["quiz-to-quiz", new QuizToQuizStrategy()],
    ])
  }

  selectStrategyEffect(params: {
    currentItem: CategoryContentItem
    direction: "next" | "previous"
    categoryItems: Array<CategoryContentItem>
  }): Effect.Effect<StrategyPayload, NavigationError> {
    const { currentItem, direction, categoryItems } = params

    // Find the current item index in the category items array
    const currentIndex = categoryItems.findIndex(
      (item) => item.categoryItemId === currentItem.categoryItemId,
    )

    if (currentIndex === -1)
      return Effect.fail({
        _tag: "FetchError",
        message: "Current item not found in category items",
      })

    // Find the adjacent item based on direction
    const adjacentIndex =
      direction === "next" ? currentIndex + 1 : currentIndex - 1

    if (adjacentIndex < 0 || adjacentIndex >= categoryItems.length)
      return Effect.fail({
        _tag: direction === "next" ? "NoNextItem" : "NoPreviousItem",
        message: `No ${direction} item available`,
      })

    const adjacentItem = categoryItems[adjacentIndex]

    // Determine strategy type based on current and adjacent item content types
    const currentContentType = currentItem.contentType
    const adjacentContentType = adjacentItem.contentType

    const strategyType: NavigationStrategyType =
      `${currentContentType.slice(0, -1)}-to-${adjacentContentType.slice(0, -1)}` as NavigationStrategyType

    const strategy = this.strategies.get(strategyType)

    if (!strategy)
      return Effect.fail({
        _tag: "NoStrategyFound",
        message: `No strategy found for ${strategyType}`,
      })

    return Effect.succeed({ strategy, adjacentItem })
  }
}
