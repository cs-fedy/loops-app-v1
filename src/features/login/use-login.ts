// src/hooks/useLogin.ts
import { useCallback } from "react"
import { useServerFn } from "@tanstack/react-start"
import { useNavigate } from "@tanstack/react-router"
import { loginFn } from "./login-fn.server"
import type { LoginWire } from "./login-fn.server"

export function useLogin() {
  const logUser = useServerFn(loginFn)
  const navigate = useNavigate()

  const handleLogin = useCallback(
    async (username: string, password: string) => {
      // Call server function → returns JSON-safe union
      const response = (await logUser({
        data: { password, username },
      })) as LoginWire

      // No runtime decode on client. If you still want runtime checks,
      // you can add a tiny inline type guard here.
      if (response._tag === "Success") {
        await navigate({ to: "/" })
      }

      return response
    },
    [logUser, navigate],
  )

  return { handleLogin }
}
