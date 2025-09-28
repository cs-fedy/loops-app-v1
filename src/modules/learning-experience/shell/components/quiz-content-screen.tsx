import { HalfStarIcon } from "@/modules/shared/components/icons/half-star"
import { NoteIcon } from "@/modules/shared/components/icons/note"
import { TimerIcon } from "@/modules/shared/components/icons/timer"
import { BottomTabNavigator } from "@/modules/shared/components/navigation/bottom-tab-navigator"
import { CategoryContentItem } from "@/modules/shared/domain/entities/category-content-item"
import { BackButton } from "@/modules/shared/shell/category_selection/components/back-button"

type QuizContentScreenProps = {
  quizItem: CategoryContentItem & { contentType: "quizzes" }
  onBack: () => void
}

export function QuizContentScreen({
  quizItem,
  onBack,
}: QuizContentScreenProps) {
  return (
    <div className="bg-loops-background flex h-full flex-col">
      {/* Header */}
      <div className="relative flex items-center justify-center px-4 py-6">
        <BackButton onBack={onBack} />
        <h1 className="font-outfit text-loops-light text-xl font-bold tracking-tight">
          {quizItem.content.label[0].content}
        </h1>
      </div>

      {/* Content Area */}
      <div className="flex-1 px-4 pb-20">
        <div className="flex h-full items-center justify-center">
          <div className="w-full max-w-sm">
            {/* Quiz Content Box - Inspired by the box design */}
            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <div className="relative mx-auto mb-6 flex h-26 w-26 items-center justify-center">
                {/* Glow Effect */}
                <div className="absolute inset-0 z-0 rounded-full bg-cyan-400/20 blur-sm"></div>
                <div className="text-loops-cyan z-10 h-24 w-24 shrink-0 grow-0">
                  <NoteIcon />
                </div>
              </div>

              {/* Title */}
              <h2 className="font-outfit mb-4 text-center text-2xl font-medium text-gray-900">
                Quiz Ready
              </h2>

              {/* Stats */}
              <div className="mb-6 flex items-end justify-center gap-8">
                <div className="flex flex-col items-center">
                  <div className="mb-3 h-10 w-10 shrink-0 grow-0 text-purple-600">
                    <NoteIcon />
                  </div>
                  <div className="text-center">
                    <p className="font-outfit text-xl font-semibold text-gray-900">
                      {quizItem.content.questionsCount}
                    </p>
                    <p className="font-outfit text-sm text-gray-600">
                      Questions
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="mb-3 h-10 w-10 shrink-0 grow-0 text-yellow-600">
                    <HalfStarIcon />
                  </div>
                  <div className="text-center">
                    <p className="font-outfit text-xl font-semibold text-gray-900">
                      {quizItem.content.score}
                    </p>
                    <p className="font-outfit text-sm text-gray-600">XP</p>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="mb-3 h-10 w-10 shrink-0 grow-0 text-orange-600">
                    <TimerIcon />
                  </div>
                  <div className="text-center">
                    <p className="font-outfit text-xl font-semibold text-gray-900">
                      {quizItem.content.totalTime}
                    </p>
                    <p className="font-outfit text-sm text-gray-600">Second</p>
                  </div>
                </div>
              </div>

              {/* Start Button */}
              <button className="w-full rounded-xl bg-cyan-400 px-6 py-4 shadow-md">
                <p className="font-outfit text-lg font-semibold text-white">
                  Start Quiz
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tab Navigation */}
      <div className="fixed bottom-0 left-1/2 z-10 w-full max-w-sm -translate-x-1/2">
        <BottomTabNavigator />
      </div>
    </div>
  )
}
