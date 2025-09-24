import { CategoryContentItem } from "@/modules/content-management/features/content-list/services/category-content-fn.server"
import { BookIcon } from "@/modules/shared/components/icons/book"
import { LockIcon } from "@/modules/shared/components/icons/lock"
import { MedalStarIcon } from "@/modules/shared/components/icons/medal-star"
import { cn } from "@/modules/shared/lib/utils"
import { ProgressState } from "@/modules/shared/utils/types"
import { motion } from "framer-motion"

export type CategoryItemProps = {
  item: CategoryContentItem
  index: number
}

export function CategoryItemCircle({ item, index }: CategoryItemProps) {
  const getProgressState = (): ProgressState => {
    if (item.contentType === "skills") {
      if (item.completedSkill?.isCompleted) return "completed"
      if (item.completedSkill) return "started"
      return "locked"
    }

    if (item.startedQuiz?.status === "completed") return "completed"
    if (item.startedQuiz) return "started"
    return "locked"
  }

  const getProgress = () => {
    if (item.contentType === "skills") {
      if (item.completedSkill?.isCompleted) return 100
      if (item.completedSkill) return Math.min(item.completedSkill.score, 100)
      return 0
    }

    if (item.startedQuiz?.status === "completed") return 100
    if (item.startedQuiz && item.content.questionsCount > 0)
      return Math.round(
        (item.startedQuiz.completedQuestions / item.content.questionsCount) *
          100,
      )
    return 0
  }

  const progressState = getProgressState()
  const progress = getProgress()
  const isFirstItem = index === 0
  const isLocked = progressState === "locked"

  const getCircleColors = () => {
    if (progressState === "completed")
      return {
        outer: "bg-green-500",
        inner: "bg-green-600",
        progress: "stroke-green-400",
        text: "text-white",
      }

    if (isFirstItem && isLocked)
      return {
        outer: "bg-pink-500",
        inner: "bg-pink-600",
        progress: "stroke-pink-400",
        text: "text-white",
      }

    if (progressState === "started")
      return {
        outer: "bg-blue-500",
        inner: "bg-blue-600",
        progress: "stroke-cyan-400",
        text: "text-white",
      }

    return {
      outer: "bg-white/20",
      inner: "bg-white/10",
      progress: "stroke-white/30",
      text: "text-white/70",
    }
  }

  const colors = getCircleColors()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "relative flex h-28 w-28 items-center justify-center rounded-full",
        colors.outer,
      )}
    >
      {/* Progress Circle */}
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          className="text-white/50"
        />
        {progress > 0 && (
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${progress * 2.83} 283`}
            className={colors.progress}
          />
        )}
      </svg>

      {/* Inner Circle */}
      <div
        className={cn(
          "relative flex h-20 w-20 items-center justify-center rounded-full",
          colors.inner,
        )}
      >
        {isLocked && !isFirstItem ? (
          <div className={cn("h-10 w-10 shrink-0 grow-0 text-white/50")}>
            <LockIcon />
          </div>
        ) : progressState === "completed" && item.contentType === "quizzes" ? (
          <div className={cn("h-10 w-10 shrink-0", "text-yellow-400")}>
            <MedalStarIcon />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            {item.contentType === "quizzes" ? (
              <div className={cn("h-10 w-10 shrink-0", colors.text)}>
                <MedalStarIcon />
              </div>
            ) : (
              <div className={cn("h-10 w-10 shrink-0", colors.text)}>
                <BookIcon />
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}
