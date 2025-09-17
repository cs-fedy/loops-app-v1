import { useEffect, useState } from "react"

export function usePageLoading(): boolean {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (document.readyState === "complete") setIsLoading(false)
  }, [])

  return isLoading
}
