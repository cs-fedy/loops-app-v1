import { CategoryWithStartedCategory } from "@/modules/content-management/features/category-selection/services/explore-categories-fn.server"
import { useExploreCategory } from "@/modules/content-management/features/content-detail/services/use-explore-category"
import { CategoryDetails } from "./category-details"

type CategoryDetailsWrapperProps = {
  categoryId: string
  onBack: () => void
  showBackButton: boolean
  onViewAll: (category: CategoryWithStartedCategory) => void
}

export function CategoryDetailsWrapper({
  categoryId,
  onViewAll,
  onBack,
  showBackButton,
}: CategoryDetailsWrapperProps) {
  const { category } = useExploreCategory({ categoryId })

  return (
    <CategoryDetails
      category={category}
      onViewAll={() => onViewAll(category)}
      onBack={onBack}
      showBackButton={showBackButton}
    />
  )
}
