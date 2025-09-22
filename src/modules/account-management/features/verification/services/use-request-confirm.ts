// src/features/request_confirm/use-request-confirm.ts
import { useCallback } from "react"
import { useServerFn } from "@tanstack/react-start"
import { requestConfirmFn } from "./request-confirm-fn.server"
import type { RequestConfirmWire } from "./request-confirm-fn.server"

export function useRequestConfirm() {
  const requestConfirmServer = useServerFn(requestConfirmFn)

  const handleRequestConfirm = useCallback(async () => {
    // Call server function → returns JSON-safe union
    const response = (await requestConfirmServer()) as RequestConfirmWire

    // No runtime decode on client. If you still want runtime checks,
    // you can add a tiny inline type guard here.
    return response
  }, [requestConfirmServer])

  return { handleRequestConfirm }
}
