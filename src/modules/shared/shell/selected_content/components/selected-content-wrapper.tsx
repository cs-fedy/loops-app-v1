import { useSingleCategoryItem } from "@/modules/content-management/features/single-item/services/use-single-category-item"
import { useSelectedContent } from "@/modules/shared/contexts/selected-content-context"
import { useEffect } from "react"
import { SelectedContentScreen } from "./selected-content-screen"

type SelectedContentWrapperProps = {
  categoryId: string
  contentId: string
}

export function SelectedContentWrapper({
  categoryId,
  contentId,
}: SelectedContentWrapperProps) {
  const { setSelectedContent } = useSelectedContent()
  const { categoryItem } = useSingleCategoryItem({
    itemId: contentId,
    categoryId,
  })

  useEffect(() => {
    setSelectedContent(categoryItem)
  }, [categoryItem])

  return <SelectedContentScreen selectedItem={categoryItem} />
}
