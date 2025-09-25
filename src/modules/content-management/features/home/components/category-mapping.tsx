import { CategoryContentItem } from "@/modules/shared/domain/entities/category-content-item"
import { useMemo } from "react"
import { CategoryItemCircle } from "./category-item-circle"
import { CategoryMappingProps } from "./types"

export function CategoryMapping({
  categoryItems,
  categoryId,
}: CategoryMappingProps) {
  const renderRow = (items: Array<CategoryContentItem>, rowIndex: number) => {
    const isOddRow = rowIndex % 2 === 0

    if (isOddRow) {
      const itemIndex = categoryItems.indexOf(items[0])
      const previousItems = categoryItems.slice(0, itemIndex)

      return (
        <div key={`row-${rowIndex}`} className="flex justify-center">
          <CategoryItemCircle
            item={items[0]}
            index={itemIndex}
            categoryId={categoryId}
            previousItems={previousItems}
          />
        </div>
      )
    }

    return (
      <div key={`row-${rowIndex}`} className="flex justify-center gap-8">
        {items.map((item, itemIndex) => {
          const globalIndex = categoryItems.indexOf(item)
          const previousItems = categoryItems.slice(0, globalIndex)

          return (
            <CategoryItemCircle
              item={item}
              key={`row-${rowIndex}-column-${itemIndex}`}
              index={globalIndex}
              categoryId={categoryId}
              previousItems={previousItems}
            />
          )
        })}
      </div>
    )
  }

  const rows = useMemo(() => {
    const getRowIndex = (itemIndex: number) => {
      let rowIndex = 0
      let processedItems = 0

      while (processedItems <= itemIndex) {
        const isOddRow = rowIndex % 2 === 0
        const itemsInThisRow = isOddRow ? 1 : 2
        if (processedItems + itemsInThisRow > itemIndex) return rowIndex
        processedItems += itemsInThisRow
        rowIndex++
      }

      return rowIndex
    }

    return categoryItems.reduce(
      (acc, item, index) => {
        const rowIndex = getRowIndex(index)

        if (!acc[rowIndex]) acc[rowIndex] = []
        acc[rowIndex] = [...acc[rowIndex], item]

        return acc
      },
      [] as Array<Array<CategoryContentItem>>,
    )
  }, [categoryItems])

  // TODO: use tanstack virtual here

  return (
    <div className="mb-24 flex flex-col items-center space-y-6">
      {rows.map((rowItems, rowIndex) => renderRow(rowItems, rowIndex))}
    </div>
  )
}
