import { motion } from "framer-motion"

export function CategoriesListSkeleton() {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="relative flex items-center justify-center px-4 py-6">
        {/* Back button skeleton */}
        <div className="absolute left-4 h-8 w-8 animate-pulse rounded-full bg-white/10" />

        <h1 className="font-outfit text-loops-light text-xl font-bold tracking-tight">
          All categories
        </h1>
      </div>

      {/* Categories List Skeleton */}
      <div className="flex-1 overflow-auto px-4">
        <div className="space-y-3">
          {[...Array(6)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex w-full items-center gap-x-2"
            >
              {/* Progress indicator skeleton */}
              <div className="flex h-full w-auto flex-col items-center gap-y-1">
                <div className="h-5 w-0.5 animate-pulse rounded-xl bg-white/10"></div>
                <div className="h-5 w-5 animate-pulse rounded-full bg-white/10"></div>
                <div className="h-5 w-0.5 animate-pulse rounded-xl bg-white/10"></div>
              </div>

              {/* Category Card Skeleton */}
              <div className="relative w-full overflow-hidden rounded-2xl bg-white/10 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      {/* Category Image/Icon skeleton */}
                      <div className="h-20 w-20 animate-pulse rounded-lg bg-white/20" />

                      <div className="flex-1 space-y-2">
                        {/* Title skeleton */}
                        <div className="h-5 w-32 animate-pulse rounded bg-white/20" />
                        {/* Subtitle skeleton */}
                        <div className="h-4 w-20 animate-pulse rounded bg-white/20" />
                      </div>
                    </div>
                  </div>

                  {/* Status indicator skeleton */}
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 animate-pulse rounded-full bg-white/20" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
