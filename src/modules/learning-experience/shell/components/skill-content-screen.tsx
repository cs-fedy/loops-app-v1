import { ContentSkeleton } from "@/components/ui/content-skeleton"
import { BottomTabNavigator } from "@/modules/shared/components/navigation/bottom-tab-navigator"
import { CategoryContentItem } from "@/modules/shared/domain/entities/category-content-item"
import { SkillContent } from "@/modules/shared/domain/entities/skill-content"
import { BackButton } from "@/modules/shared/shell/category_selection/components/back-button"
import { Suspense } from "react"
import { SkillActionButton } from "./skill-action-button"
import { SkillContentRenderer } from "./skill-content-renderer"

type SkillContentScreenProps = {
  skillItem: CategoryContentItem & { contentType: "skills" }
  onBack: () => void
}

export function SkillContentScreen({
  skillItem,
  onBack,
}: SkillContentScreenProps) {
  const skillContent = skillItem.skillContent as SkillContent

  // Get content URL for markdown fetching
  const contentUrl = skillContent.contentURL[0].content

  return (
    <div className="bg-loops-background flex h-full flex-col">
      {/* Header */}
      <div className="relative flex items-center justify-center px-4 py-6">
        <BackButton onBack={onBack} />
        <h1 className="font-outfit text-loops-light text-xl font-bold tracking-tight">
          {skillItem.content.label[0].content}
        </h1>
      </div>

      {/* Content Area */}
      <div className="mb-10 flex-1 overflow-y-auto px-7 pb-20">
        <div className="flex flex-col items-start pt-8">
          <div className="w-full max-w-sm">
            <Suspense fallback={<ContentSkeleton />}>
              <SkillContentRenderer
                contentUrl={skillContent.contentURL[0].content}
              />
            </Suspense>
          </div>

          {/* Action Button */}
          <SkillActionButton skillItem={skillItem} />
        </div>
      </div>

      {/* Bottom Tab Navigation */}
      <div className="fixed bottom-0 left-1/2 z-10 w-full max-w-sm -translate-x-1/2">
        <BottomTabNavigator />
      </div>
    </div>
  )
}
