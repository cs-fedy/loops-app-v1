import { useState } from "react"
import { useRequestConfirm } from "./use-request-confirm"
import { Button } from "@/modules/shared/components/ui/button"
import { useToast } from "@/modules/shared/hooks/use-toast"

type RequestConfirmCodeProps = {
  handleCodeExpirationChange: (seconds: number) => void
}

export function RequestConfirmCode({
  handleCodeExpirationChange,
}: RequestConfirmCodeProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { handleRequestConfirm } = useRequestConfirm()
  const { error, success } = useToast()

  const handleResendCode = async () => {
    setIsLoading(true)
    const response = await handleRequestConfirm()
    setIsLoading(false)

    if (response._tag === "Success") {
      const remainingSeconds =
        Math.floor(response.value.payload.expiresAt.getTime() / 1000) -
        Math.floor(Date.now() / 1000)

      handleCodeExpirationChange(remainingSeconds)
      success("Confirmation code sent successfully!", {
        description: "Please check your email for the new confirmation code.",
      })
    } else
      error("Failed to send confirmation code", {
        description:
          "Please try again or contact support if the problem persists.",
      })
  }

  return (
    <div className="flex flex-col items-center gap-y-4">
      <p className="font-outfit text-loops-cyan text-center text-base font-medium">
        I didn&apos;t receive a code
      </p>
      <Button
        className="font-outfit bg-loops-white text-loops-text hover:bg-loops-white/90 w-full rounded-xl py-7 text-lg leading-5 font-semibold shadow-none"
        disabled={isLoading}
        onClick={handleResendCode}
        type="button"
      >
        {isLoading ? "Sending..." : "Resend"}
      </Button>
    </div>
  )
}
