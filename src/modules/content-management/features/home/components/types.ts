import { CategoryContentItem } from "@/modules/shared/domain/entities/category-content-item"

export type CategoryMappingProps = { 
  categoryItems: Array<CategoryContentItem>
  categoryId: string
}

export type CategoryItemProps = {
  item: CategoryContentItem
  index: number
  categoryId: string
  previousItems: CategoryContentItem[]
}