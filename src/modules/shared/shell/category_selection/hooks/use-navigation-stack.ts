import type React from "react"
import { useState } from "react"

export type NavigationStackItem = {
  name: string
  screen: React.ReactNode
}

export type ScreenType = "categories" | "category-details" | "content-list"

export type UseNavigationStackReturn = {
  canGoBack: boolean
  currentScreen: NavigationStackItem | null
  pop: () => void
  push: (name: string, screen: React.ReactNode) => void
  reset: () => void
}

export function useNavigationStack(): UseNavigationStackReturn {
  const [stack, setStack] = useState<Array<NavigationStackItem>>([])

  const currentScreen = stack.length > 0 ? stack[stack.length - 1] : null
  const canGoBack = stack.length > 0

  const push = (name: string, screen: React.ReactNode) => {
    const newItem: NavigationStackItem = { name, screen }
    setStack((prev) => [...prev, newItem])
  }

  const pop = () =>
    setStack((prev) => {
      if (prev.length <= 0) return prev
      return prev.slice(0, -1)
    })

  const reset = () => setStack([])

  return {
    canGoBack,
    currentScreen,
    pop,
    push,
    reset,
  }
}
