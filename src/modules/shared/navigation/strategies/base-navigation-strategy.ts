import type { CategoryContentItem } from "@/modules/shared/domain/entities/category-content-item"
import { Effect } from "effect"
import type {
  INavigationStrategy,
  NavigationContext,
  NavigationError,
} from "../types/navigation-types"

export abstract class BaseNavigationStrategy implements INavigationStrategy {
  abstract canNavigate(context: NavigationContext): boolean
  abstract navigate(
    context: NavigationContext,
  ): Effect.Effect<CategoryContentItem, NavigationError>
  abstract validateCompletion(item: CategoryContentItem): boolean
}
