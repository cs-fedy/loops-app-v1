import { CategoryContentItem } from "@/modules/content-management/features/content-list/services/category-content-fn.server"

export type CategoryMappingProps = { 
  categoryItems: Array<CategoryContentItem> 
}

export type CategoryItemProps = {
  item: CategoryContentItem
  index: number
}