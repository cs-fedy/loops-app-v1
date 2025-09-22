import axios from "axios"
import { Effect } from "effect"
import { refreshAccessToken } from "../api/auth/refresh"
import { deleteSession, getSession, updateTokens } from "@/modules/shared/shell/session"

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  withCredentials: true,
})

export function interceptRequests(accessToken: string) {
  instance.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${accessToken}`
      return config
    },
    (error) => Promise.reject(error),
  )
}

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response || error.response.data.code !== "invalid_token")
      return Promise.reject(error)

    const session = await getSession()
    const response = refreshAccessToken(
      session ? { refresh: session.refreshToken } : undefined,
    )

    const promise = Effect.match(response, {
      onFailure: (failure) => {
        deleteSession()
        // TODO: handle here returning a custom error that
        // TODO: when catched later will trigger redirect to login page
        return Promise.reject(error)
      },
      onSuccess: (value) => {
        const accessToken = value.access.token
        interceptRequests(accessToken)
        updateTokens({ accessToken, refreshToken: value.refresh.token })

        const originalRequest = error.config
        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        return axios(originalRequest)
      },
    })

    return Effect.runPromise(promise)
  },
)
