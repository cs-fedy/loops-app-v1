import { useCallback } from "react"
import { useServerFn } from "@tanstack/react-start"
import { useQueryClient } from "@tanstack/react-query"
import { confirmAccountFn } from "./confirm-account-fn.server"
import type { ConfirmAccountWire } from "./confirm-account-fn.server"

export function useConfirmAccount() {
  const confirmAccountServer = useServerFn(confirmAccountFn)
  const queryClient = useQueryClient()

  const handleConfirmAccount = useCallback(
    async (confirmationCode: number) => {
      // Call server function → returns JSON-safe union
      const response = (await confirmAccountServer({
        data: { confirmationCode },
      })) as ConfirmAccountWire

      // If successful, invalidate the authenticated query to refresh user state
      if (response._tag === "Success") {
        await queryClient.invalidateQueries({
          exact: true,
          queryKey: ["authenticated"],
        })
      }

      // No runtime decode on client. If you still want runtime checks,
      // you can add a tiny inline type guard here.
      return response
    },
    [confirmAccountServer, queryClient],
  )

  return { handleConfirmAccount }
}
