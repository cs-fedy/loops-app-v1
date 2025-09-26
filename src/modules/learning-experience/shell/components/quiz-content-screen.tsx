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
              {/* Glow Effect */}
              <div className="mx-auto mb-6 h-26 w-26 rounded-full bg-cyan-400/20 blur-sm"></div>

              {/* Title */}
              <h2 className="font-outfit mb-4 text-center text-2xl font-medium text-gray-900">
                Quiz Ready
              </h2>

              {/* Stats */}
              <div className="mb-6 flex items-end justify-center gap-8">
                <div className="flex flex-col items-center">
                  <div className="mb-3 h-6 w-6 text-purple-600">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 11H7v8h2v-8zm4-4h-2v12h2V7zm4-2h-2v14h2V5z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="font-outfit text-xl font-semibold text-gray-900">
                      ?
                    </p>
                    <p className="font-outfit text-sm text-gray-600">
                      Questions
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="mb-3 h-6 w-6 text-yellow-600">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="font-outfit text-xl font-semibold text-gray-900">
                      ?
                    </p>
                    <p className="font-outfit text-sm text-gray-600">XP</p>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="mb-3 h-6 w-6 text-orange-600">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="font-outfit text-xl font-semibold text-gray-900">
                      ?
                    </p>
                    <p className="font-outfit text-sm text-gray-600">Time</p>
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

            {/* Placeholder Text */}
            <div className="mt-6 text-center">
              <p className="text-xs text-white/50">
                Quiz {quizItem.content.quizId} in category {quizItem.categoryId}
              </p>
              <p className="mt-1 text-xs text-white/30">
                This is a placeholder for future quiz implementation
              </p>
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
