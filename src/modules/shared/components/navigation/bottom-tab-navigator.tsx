import { CategoryIcon } from "@/modules/shared/components/icons/category"
import { FlashIcon } from "@/modules/shared/components/icons/flash"
import { StarIcon } from "@/modules/shared/components/icons/star"
import { UserIcon } from "@/modules/shared/components/icons/user"
import { TabItem } from "./tab-item"

export function BottomTabNavigator() {
  return (
    <div className="relative left-1/2 mb-4 w-full -translate-x-1/2 px-8">
      <div className="relative flex w-full items-start justify-between rounded-xl bg-[rgba(12,20,43,0.8)] bg-[linear-gradient(90deg,rgba(255,255,255,0.2)_0%,rgba(49,188,230,0.2)_100%)] px-8 pb-3 backdrop:blur-[47px]">
        <TabItem label="Home" icon={<CategoryIcon />} href="/" />
        <TabItem label="Explore" icon={<FlashIcon />} href="/explore" />
        <TabItem label="Leaderboard" icon={<StarIcon />} href="/leaderboard" />
        <TabItem label="Profile" icon={<UserIcon />} href="/profile" />
      </div>
    </div>
  )
}

// Export a spacer component to prevent content from being obscured by the tab bar
export function BottomTabSpacer() {
  return <div className="h-24" />
}
