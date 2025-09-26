import type { CategoryContentItem } from "@/modules/shared/domain/entities/category-content-item"
import { Effect } from "effect"
import type { NavigationError } from "../types/navigation-types"
import { OptimizedStrategySelector } from "../utils/optimized-strategy-selector"

export interface ISkillNavigationManager {
  navigateToNext(params: {
    currentItem: CategoryContentItem
    categoryItems: CategoryContentItem[]
  }): Effect.Effect<CategoryContentItem, NavigationError>
  navigateToPrevious(params: {
    currentItem: CategoryContentItem
    categoryItems: CategoryContentItem[]
  }): Effect.Effect<CategoryContentItem, NavigationError>
  canNavigateNext(params: {
    currentItem: CategoryContentItem
    categoryItems: CategoryContentItem[]
  }): Effect.Effect<boolean, NavigationError>
  canNavigatePrevious(params: {
    currentItem: CategoryContentItem
    categoryItems: CategoryContentItem[]
  }): Effect.Effect<boolean, NavigationError>
}

export class SkillNavigationManager implements ISkillNavigationManager {
  private strategySelector: OptimizedStrategySelector

  constructor() {
    this.strategySelector = new OptimizedStrategySelector()
  }

  navigateToNext(params: {
    currentItem: CategoryContentItem
    categoryItems: CategoryContentItem[]
  }): Effect.Effect<CategoryContentItem, NavigationError> {
    const { currentItem, categoryItems } = params
    const self = this

    return Effect.gen(function* () {
      const { strategy, adjacentItem } =
        yield* self.strategySelector.selectStrategyEffect({
          currentItem,
          direction: "next",
          categoryItems,
        })

      return yield* strategy.navigate({
        currentItem,
        direction: "next",
        categoryId: currentItem.categoryId,
        adjacentItem,
      })
    })
  }

  navigateToPrevious(params: {
    currentItem: CategoryContentItem
    categoryItems: CategoryContentItem[]
  }): Effect.Effect<CategoryContentItem, NavigationError> {
    const { currentItem, categoryItems } = params
    const self = this

    return Effect.gen(function* () {
      const { strategy, adjacentItem } =
        yield* self.strategySelector.selectStrategyEffect({
          currentItem,
          direction: "previous",
          categoryItems,
        })

      return yield* strategy.navigate({
        currentItem,
        direction: "previous",
        categoryId: currentItem.categoryId,
        adjacentItem,
      })
    })
  }

  canNavigateNext(params: {
    currentItem: CategoryContentItem
    categoryItems: CategoryContentItem[]
  }): Effect.Effect<boolean, NavigationError> {
    const { currentItem, categoryItems } = params
    const self = this

    return Effect.gen(function* () {
      const { strategy, adjacentItem } =
        yield* self.strategySelector.selectStrategyEffect({
          currentItem,
          direction: "next",
          categoryItems,
        })

      return strategy.canNavigate({
        currentItem,
        direction: "next",
        categoryId: currentItem.categoryId,
        adjacentItem,
      })
    })
  }

  canNavigatePrevious(params: {
    currentItem: CategoryContentItem
    categoryItems: CategoryContentItem[]
  }): Effect.Effect<boolean, NavigationError> {
    const { currentItem, categoryItems } = params
    const self = this

    return Effect.gen(function* () {
      const { strategy, adjacentItem } =
        yield* self.strategySelector.selectStrategyEffect({
          currentItem,
          direction: "previous",
          categoryItems,
        })

      return strategy.canNavigate({
        currentItem,
        direction: "previous",
        categoryId: currentItem.categoryId,
        adjacentItem,
      })
    })
  }
}
