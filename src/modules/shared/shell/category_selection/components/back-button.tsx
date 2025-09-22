import { ChevronLeft } from "lucide-react"

type BackButtonProps = {
  onBack: () => void
  show?: boolean
}

export function BackButton({ onBack, show = true }: BackButtonProps) {
  if (!show) return null
  
  return (
    <button 
      onClick={onBack}
      className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#1f4b6682] opacity-50 shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-[#1f4b66aa]"
    >
      <div className="bg-loops-cyan flex h-5 w-5 items-center justify-center rounded-full">
        <ChevronLeft className="text-loops-light h-4 w-4" />
      </div>
    </button>
  )
}
