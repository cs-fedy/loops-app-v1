import { Link, useLocation } from "@tanstack/react-router"
import { ReactNode } from "react"
import { cn } from "../../lib/utils"

interface TabItemProps {
  label: string
  icon: ReactNode
  href: string
}

export function TabItem({ label, icon, href }: TabItemProps) {
  const location = useLocation()
  const isActive = location.pathname === href

  return (
    <div className="relative flex flex-col items-center">
      {isActive && (
        <div className="flex flex-col items-center">
          <div className="bg-loops-cyan absolute top-5 h-6 w-6 rounded-full blur-[13px]" />
          <div className="bg-loops-cyan h-1.5 w-14 rounded-b-md" />
        </div>
      )}

      {/* Tab content */}
      <Link
        to={href}
        className={cn(
          "flex flex-col items-center gap-y-1 transition-colors duration-200",
          isActive ? "mt-1.5" : "mt-3",
        )}
      >
        <div
          className={cn(
            "h-10 w-10 transition-colors duration-200",
            isActive ? "text-loops-cyan" : "text-loops-light",
          )}
        >
          {icon}
        </div>

        <span
          className={cn(
            "font-outfit text-center text-[10px] transition-colors duration-200",
            isActive ? "text-loops-cyan font-medium" : "text-loops-light",
          )}
        >
          {label}
        </span>
      </Link>
    </div>
  )
}
