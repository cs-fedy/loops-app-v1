import { BottomTabNavigator } from "@/modules/shared/components/navigation/bottom-tab-navigator"
import { CategoryContentItem } from "@/modules/shared/domain/entities/category-content-item"
import { BackButton } from "@/modules/shared/shell/category_selection/components/back-button"

type SkillContentScreenProps = {
  skillItem: CategoryContentItem & { contentType: "skills" }
  onBack: () => void
}

export function SkillContentScreen({
  skillItem,
  onBack,
}: SkillContentScreenProps) {
  return (
    <div className="bg-loops-background flex h-full flex-col">
      {/* Header */}
      <div className="relative flex items-center justify-center px-4 py-6">
        <BackButton onBack={onBack} />

        <h1 className="font-outfit text-loops-light text-xl font-bold tracking-tight">
          Skill Content
        </h1>
      </div>

      {/* Content Area */}
      <div className="flex-1 px-4 pb-20">
        <div className="flex h-full items-center justify-center">
          <div className="space-y-4 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/20">
              <div className="h-10 w-10 rounded-full bg-blue-500"></div>
            </div>
            <h2 className="font-outfit text-lg font-semibold text-white">
              Skill Content
            </h2>
            <p className="text-sm text-white/70">
              Content for skill {skillItem.content.skillId} in category{" "}
              {skillItem.categoryId}
            </p>
            <p className="text-xs text-white/50">
              This is a placeholder for future skill content implementation
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Tab Navigation */}
      <BottomTabNavigator />
    </div>
  )
}
