import { CategoryContentItem } from "@/modules/shared/domain/entities/category-content-item"
import { QuizItemCircle } from "./quiz-item-circle"
import { SkillItemCircle } from "./skill-item-circle"

export type CategoryItemProps = {
  item: CategoryContentItem
  index: number
  categoryId: string
  previousItems: Array<CategoryContentItem>
}

export function CategoryItemCircle({
  item,
  index,
  categoryId,
  previousItems,
}: CategoryItemProps) {
  if (item.contentType === "quizzes")
    return (
      <QuizItemCircle
        item={item}
        index={index}
        categoryId={categoryId}
        previousItems={previousItems}
      />
    )

  return (
    <SkillItemCircle
      item={item}
      index={index}
      categoryId={categoryId}
      previousItems={previousItems}
    />
  )
}
