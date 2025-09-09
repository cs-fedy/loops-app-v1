import { useCallback } from "react"
import { createServerFn, useServerFn } from "@tanstack/react-start"
import { z } from "zod"
import { Effect } from "effect"
import { useNavigate } from "@tanstack/react-router"
import { login } from "@/lib/api/auth/login"
import { interceptRequests } from "@/lib/utils/axios"
import { createSession } from "@/lib/shell/session"

const loginFn = createServerFn({ method: "POST", response: "data" })
  .validator(
    z.object({
      password: z.string(),
      username: z.string(),
    }),
  )
  .handler((ctx) => {
    const response = login(ctx.data)

    const data = Effect.runSyncExit(response)
    if (data._tag === "Success") {
      interceptRequests(data.value.access.token)
      createSession({
        accessToken: data.value.access.token,
        refreshToken: data.value.refresh.token,
      })
    }

    return data.toJSON()
  })

export function useLogin() {
  const logUser = useServerFn(loginFn)
  const navigate = useNavigate()

  const handleLogin = useCallback(
    async (username: string, password: string) => {
      const response = await logUser({ data: { password, username } })
      if (!response) await navigate({ to: "/" })
      return response
    },
    [],
  )

  return { handleLogin }
}
