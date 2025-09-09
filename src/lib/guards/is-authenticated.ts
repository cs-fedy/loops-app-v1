import { createServerFn } from "@tanstack/react-start"
import { Effect } from "effect"
import { getLoggedUser } from "../api/users/get-logged-user"
import type { User } from "../domain/entities/user"

export const isAuthenticated = createServerFn({
  method: "GET",
  response: "data",
}).handler(async (): Promise<null | User> => {
  const response = getLoggedUser()
  const promise = Effect.match(response, {
    onFailure: (failure) => null,
    onSuccess: (value) => value.user,
  })

  return Effect.runPromise(promise)
})
