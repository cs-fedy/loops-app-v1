import type { CategoryContentItem } from "@/modules/shared/domain/entities/category-content-item"
import { Effect } from "effect"
import type { NavigationError } from "../types/navigation-types"
import { OptimizedStrategySelector } from "../utils/optimized-strategy-selector"

export interface IQuizNavigationManager {
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

export class QuizNavigationManager implements IQuizNavigationManager {
  private strategySelector: OptimizedStrategySelector

  constructor() {
    this.strategySelector = new OptimizedStrategySelector()
  }

  navigateToNext(params: {
    currentItem: CategoryContentItem
    categoryItems: CategoryContentItem[]
  }): Effect.Effect<CategoryContentItem, NavigationError> {
    const self = this

    return Effect.gen(function* () {
      const { strategy, adjacentItem } =
        yield* self.strategySelector.selectStrategyEffect({
          currentItem: params.currentItem,
          direction: "next",
          categoryItems: params.categoryItems,
        })

      return yield* strategy.navigate({
        currentItem: params.currentItem,
        direction: "next",
        categoryId: params.currentItem.categoryId,
        adjacentItem,
      })
    })
  }

  navigateToPrevious(params: {
    currentItem: CategoryContentItem
    categoryItems: CategoryContentItem[]
  }): Effect.Effect<CategoryContentItem, NavigationError> {
    const self = this

    return Effect.gen(function* () {
      const { strategy, adjacentItem } =
        yield* self.strategySelector.selectStrategyEffect({
          currentItem: params.currentItem,
          direction: "previous",
          categoryItems: params.categoryItems,
        })

      return yield* strategy.navigate({
        currentItem: params.currentItem,
        direction: "previous",
        categoryId: params.currentItem.categoryId,
        adjacentItem,
      })
    })
  }

  canNavigateNext(params: {
    currentItem: CategoryContentItem
    categoryItems: CategoryContentItem[]
  }): Effect.Effect<boolean, NavigationError> {
    const self = this

    return Effect.gen(function* () {
      const { strategy, adjacentItem } =
        yield* self.strategySelector.selectStrategyEffect({
          currentItem: params.currentItem,
          direction: "next",
          categoryItems: params.categoryItems,
        })

      return strategy.canNavigate({
        currentItem: params.currentItem,
        direction: "next",
        categoryId: params.currentItem.categoryId,
        adjacentItem,
      })
    })
  }

  canNavigatePrevious(params: {
    currentItem: CategoryContentItem
    categoryItems: CategoryContentItem[]
  }): Effect.Effect<boolean, NavigationError> {
    const self = this

    return Effect.gen(function* () {
      const { strategy, adjacentItem } =
        yield* self.strategySelector.selectStrategyEffect({
          currentItem: params.currentItem,
          direction: "previous",
          categoryItems: params.categoryItems,
        })

      return strategy.canNavigate({
        currentItem: params.currentItem,
        direction: "previous",
        categoryId: params.currentItem.categoryId,
        adjacentItem,
      })
    })
  }
}
