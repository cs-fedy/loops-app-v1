import { cn } from "@/modules/shared/lib/utils"

type DifficultyTagProps = {
  difficulty: number
  className?: string
}

const difficultyConfig = {
  0: {
    label: "Beginner",
    colorClass: "bg-green-500",
  },
  1: {
    label: "Intermediate",
    colorClass: "bg-yellow-500",
  },
  2: {
    label: "Advanced",
    colorClass: "bg-red-500",
  },
} as const

export function DifficultyTag({ difficulty, className }: DifficultyTagProps) {
  const config = difficultyConfig[difficulty as keyof typeof difficultyConfig]

  return (
    <div className={cn("rounded px-2 py-1", config.colorClass, className)}>
      <span className="font-outfit text-xs font-medium text-white">
        {config.label}
      </span>
    </div>
  )
}
