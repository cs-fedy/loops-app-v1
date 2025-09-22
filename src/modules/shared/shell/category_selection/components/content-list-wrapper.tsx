import { useExploreCategory } from "@/modules/content-management/features/content-detail/services/use-explore-category"
import { ContentList } from "./content-list"

type ContentListWrapperProps = {
  categoryId: string
  onBack: () => void
  showBackButton: boolean
  onItemClick?: (itemId: string) => void
}

export function ContentListWrapper({
  categoryId,
  onBack,
  showBackButton,
  onItemClick,
}: ContentListWrapperProps) {
  const { category } = useExploreCategory({ categoryId })

  return (
    <ContentList
      category={category}
      onBack={onBack}
      showBackButton={showBackButton}
      {...(onItemClick && { onItemClick })}
    />
  )
}
