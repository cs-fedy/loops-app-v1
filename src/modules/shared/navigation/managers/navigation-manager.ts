import type { CategoryContentItem } from "@/modules/shared/domain/entities/category-content-item"
import { Effect } from "effect"
import type {
  INavigationManager,
  NavigationError,
} from "../types/navigation-types"
import {
  QuizNavigationManager,
  type IQuizNavigationManager,
} from "./quiz-navigation-manager"
import {
  SkillNavigationManager,
  type ISkillNavigationManager,
} from "./skill-navigation-manager"

export class NavigationManager implements INavigationManager {
  private skillNavigationManager: ISkillNavigationManager
  private quizNavigationManager: IQuizNavigationManager

  constructor() {
    this.skillNavigationManager = new SkillNavigationManager()
    this.quizNavigationManager = new QuizNavigationManager()
  }

  navigateToNext(params: {
    currentItem: CategoryContentItem
    categoryItems: Array<CategoryContentItem>
  }): Effect.Effect<CategoryContentItem, NavigationError> {
    if (params.currentItem.contentType === "skills")
      return this.skillNavigationManager.navigateToNext(params)

    if (params.currentItem.contentType === "quizzes")
      return this.quizNavigationManager.navigateToNext(params)

    return Effect.fail({
      _tag: "InvalidContentType",
      message: "Invalid content type for navigation",
    })
  }

  navigateToPrevious(params: {
    currentItem: CategoryContentItem
    categoryItems: Array<CategoryContentItem>
  }): Effect.Effect<CategoryContentItem, NavigationError> {
    if (params.currentItem.contentType === "skills")
      return this.skillNavigationManager.navigateToPrevious(params)

    if (params.currentItem.contentType === "quizzes")
      return this.quizNavigationManager.navigateToPrevious(params)

    return Effect.fail({
      _tag: "InvalidContentType",
      message: "Invalid content type for navigation",
    })
  }

  canNavigateNext(params: {
    currentItem: CategoryContentItem
    categoryItems: Array<CategoryContentItem>
  }): Effect.Effect<boolean, NavigationError> {
    if (params.currentItem.contentType === "skills")
      return this.skillNavigationManager.canNavigateNext(params)

    if (params.currentItem.contentType === "quizzes")
      return this.quizNavigationManager.canNavigateNext(params)

    return Effect.succeed(false)
  }

  canNavigatePrevious(params: {
    currentItem: CategoryContentItem
    categoryItems: Array<CategoryContentItem>
  }): Effect.Effect<boolean, NavigationError> {
    if (params.currentItem.contentType === "skills")
      return this.skillNavigationManager.canNavigatePrevious(params)

    if (params.currentItem.contentType === "quizzes")
      return this.quizNavigationManager.canNavigatePrevious(params)

    return Effect.succeed(false)
  }
}
