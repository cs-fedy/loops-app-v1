import { SpaceBackground } from "@/modules/shared/components/common/space-background"
import { Link } from "@tanstack/react-router"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { useExploreCategory } from "../../content-detail/services/use-explore-category"
import { useCategoryContent } from "../../content-list/services/use-category-content"
import { CategoryMapping } from "./category-mapping"

type HomeScreenProps = { categoryId: string }
export function HomeScreen({ categoryId }: HomeScreenProps) {
  const { categoryItems } = useCategoryContent({ categoryId })
  const { category } = useExploreCategory({ categoryId })

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])

  return (
    <SpaceBackground>
      <div
        ref={containerRef}
        className="relative z-10 flex size-full flex-col items-center justify-start gap-y-10"
      >
        <div className="fixed top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="relative aspect-square h-[600px] max-h-[90vw] w-[600px] max-w-[90vw]"
            style={{ rotate }}
          >
            <div className="bg-loops-cyan absolute inset-0 rounded-full opacity-10" />
            <div className="bg-loops-cyan absolute top-[15%] left-[15%] h-[70%] w-[70%] rounded-full opacity-10" />
            <div className="bg-loops-cyan absolute top-[30%] left-[30%] h-[40%] w-[40%] rounded-full opacity-10" />
            <div className="bg-loops-cyan absolute top-[35%] left-[35%] h-[30%] w-[30%] rounded-full opacity-20" />
            <div className="absolute top-[5%] left-[25%] h-4 w-4 rounded-full bg-purple-500" />
            <div className="absolute top-[28%] left-[20%] h-3 w-3 rounded-full bg-orange-500" />
            <div className="absolute top-[38%] left-[62%] h-3.5 w-3.5 rounded-full bg-blue-600" />
            <div className="absolute top-[52%] left-[14%] h-3.5 w-3.5 rounded-full bg-pink-500" />
            <div className="absolute top-[75%] left-[70%] h-7 w-7 rounded-full bg-pink-600" />
            <div className="bg-loops-cyan absolute top-[50%] left-[2%] h-3.5 w-3.5 rounded-full" />
          </motion.div>
        </div>

        <div className="z-10 flex w-full max-w-sm items-center justify-between">
          {/* Left Button - Navigate to all categories */}
          <Link
            to="/"
            search={{ category: "all" }}
            className="bg-loops-cyan/20 hover:bg-loops-cyan/30 flex h-10 w-10 shrink-0 grow-0 items-center justify-center rounded-lg transition-colors"
          >
            <div className="size-6 shrink-0 grow-0 text-[#31BCE6]">
              <svg
                className="size-full"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity={0.4}
                  d="M22 8.52V3.98C22 2.57 21.36 2 19.77 2H15.73C14.14 2 13.5 2.57 13.5 3.98V8.51C13.5 9.93 14.14 10.49 15.73 10.49H19.77C21.36 10.5 22 9.93 22 8.52Z"
                />
                <path d="M22 19.77V15.73C22 14.14 21.36 13.5 19.77 13.5H15.73C14.14 13.5 13.5 14.14 13.5 15.73V19.77C13.5 21.36 14.14 22 15.73 22H19.77C21.36 22 22 21.36 22 19.77Z" />
                <path d="M10.5 8.52V3.98C10.5 2.57 9.86 2 8.27 2H4.23C2.64 2 2 2.57 2 3.98V8.51C2 9.93 2.64 10.49 4.23 10.49H8.27C9.86 10.5 10.5 9.93 10.5 8.52Z" />
                <path
                  opacity={0.4}
                  d="M10.5 19.77V15.73C10.5 14.14 9.86 13.5 8.27 13.5H4.23C2.64 13.5 2 14.14 2 15.73V19.77C2 21.36 2.64 22 4.23 22H8.27C9.86 22 10.5 21.36 10.5 19.77Z"
                />
              </svg>
            </div>
          </Link>

          <div className="shrink-0 grow-1 text-center">
            <Link
              to="/"
              search={{ category: category.categoryId, details: false }}
              className="font-outfit text-center text-sm font-medium text-wrap text-white"
            >
              category: {category.name[0].content}
            </Link>
          </div>

          {category.startedCategory && (
            <div className="bg-loops-background-secondary/50 flex h-10 min-w-[60px] items-center justify-center rounded-lg px-2">
              <span className="font-outfit text-sm font-bold text-white">
                {category.startedCategory.score || 0}XP
              </span>
              <div className="size-8 shrink-0 grow-0 text-[#FFCE51]">
                <svg
                  viewBox="0 0 30 30"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity={0.4}
                    d="M7.17501 20C7.31251 19.3875 7.06251 18.5125 6.62501 18.075L3.58751 15.0375C2.63751 14.0875 2.26251 13.075 2.53751 12.2C2.82501 11.325 3.71251 10.725 5.03751 10.5L8.93751 9.85C9.50001 9.75 10.1875 9.25 10.45 8.7375L12.6 4.425C13.225 3.1875 14.075 2.5 15 2.5C15.925 2.5 16.775 3.1875 17.4 4.425L19.55 8.7375C19.7125 9.0625 20.05 9.375 20.4125 9.5875L6.95001 23.05C6.77501 23.225 6.47501 23.0625 6.52501 22.8125L7.17501 20Z"
                  />
                  <path d="M23.375 18.0751C22.925 18.5251 22.675 19.3876 22.825 20.0001L23.6875 23.7626C24.05 25.3251 23.825 26.5001 23.05 27.0626C22.7375 27.2876 22.3625 27.4001 21.925 27.4001C21.2875 27.4001 20.5375 27.1626 19.7125 26.6751L16.05 24.5001C15.475 24.1626 14.525 24.1626 13.95 24.5001L10.2875 26.6751C8.9 27.4876 7.7125 27.6251 6.95 27.0626C6.6625 26.8501 6.45 26.5626 6.3125 26.1876L21.5125 10.9876C22.0875 10.4126 22.9 10.1501 23.6875 10.2876L24.95 10.5001C26.275 10.7251 27.1625 11.3251 27.45 12.2001C27.725 13.0751 27.35 14.0876 26.4 15.0376L23.375 18.0751Z" />
                </svg>
              </div>
            </div>
          )}
        </div>

        <div className="relative z-20 space-y-6 text-center">
          <CategoryMapping categoryItems={categoryItems} />
        </div>
      </div>
    </SpaceBackground>
  )
}
