export function ContentSkeleton() {
  return (
    <div className="font-outfit w-full max-w-sm animate-pulse space-y-4 text-base leading-relaxed text-white">
      {/* Title skeleton */}
      <div className="h-6 w-3/4 rounded-md bg-white/20"></div>

      {/* Paragraph skeletons */}
      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-white/15"></div>
        <div className="h-4 w-5/6 rounded bg-white/15"></div>
        <div className="h-4 w-4/5 rounded bg-white/15"></div>
      </div>

      {/* Another paragraph */}
      <div className="space-y-3 pt-2">
        <div className="h-4 w-full rounded bg-white/15"></div>
        <div className="h-4 w-3/4 rounded bg-white/15"></div>
      </div>

      {/* Code block skeleton */}
      <div className="space-y-2 rounded-lg bg-white/10 p-4">
        <div className="h-3 w-1/4 rounded bg-white/20"></div>
        <div className="h-3 w-3/4 rounded bg-white/15"></div>
        <div className="h-3 w-1/2 rounded bg-white/15"></div>
      </div>

      {/* More content */}
      <div className="space-y-3 pt-2">
        <div className="h-4 w-full rounded bg-white/15"></div>
        <div className="h-4 w-2/3 rounded bg-white/15"></div>
      </div>
    </div>
  )
}
