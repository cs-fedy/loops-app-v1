import { useCallback, useEffect, useState } from "react"
import { WelcomeScreen } from "./welcome-screen"
import type { ReactNode } from "react"
import { LoadingScreen } from "@/components/common/loading-screen"

const FIRST_INSTALL_KEY = "isFirstInstall"

type FirstInstallShellProps = { target: ReactNode }

export function FirstInstallShell({ target }: FirstInstallShellProps) {
  const [isFirstInstall, setIsFirstInstall] = useState<boolean | null>(null)

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof window.localStorage === "undefined"
    )
      return

    const stored = localStorage.getItem(FIRST_INSTALL_KEY)
    setIsFirstInstall(stored !== "false")
  }, [])

  const markAsNotFirstInstall = useCallback(() => {
    if (
      typeof window === "undefined" ||
      typeof window.localStorage === "undefined"
    )
      return

    localStorage.setItem(FIRST_INSTALL_KEY, "false")
    setIsFirstInstall(false)
  }, [])

  if (isFirstInstall === null) return <LoadingScreen />
  if (isFirstInstall)
    return <WelcomeScreen skipHandler={markAsNotFirstInstall} />
  return target
}
