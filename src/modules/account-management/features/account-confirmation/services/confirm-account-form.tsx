import { useState } from "react"
import { useForm } from "@tanstack/react-form"
import { useConfirmAccount } from "./use-confirm-account"
import { Button } from "@/modules/shared/components/ui/button"
import { Label } from "@/modules/shared/components/ui/label"
import { CodeInputGroup } from "@/modules/shared/components/common/code-input-group"
import { CountdownTimer } from "@/modules/shared/components/common/countdown-timer"
import { RequestConfirmCode } from "@/modules/account-management/features/verification/services/request-confirm-code"
import { DangerIcon } from "@/modules/shared/components/icons/danger"

export function ConfirmAccountForm() {
  const { handleConfirmAccount } = useConfirmAccount()
  const [timeLeft, setTimeLeft] = useState<null | number>(null)

  const form = useForm({
    defaultValues: {
      confirmationCode: "",
    },
    validators: {
      onSubmitAsync: async ({ value }) => {
        const confirmationCode = parseInt(value.confirmationCode, 10)
        const response = await handleConfirmAccount(confirmationCode)

        if (response._tag === "Failure") {
          if (response.error.code === "invalid_input")
            return { confirmationCode: response.error.payload.confirmationCode }
          if (response.error.code === "invalid_expired_code")
            return { confirmationCode: response.error.message }
        }
      },
    },
  })

  return (
    <div className="mx-auto w-full max-w-md">
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <form.Field name="confirmationCode">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Confirmation Code</Label>
              <CodeInputGroup
                length={5}
                onChange={(value) => field.handleChange(value)}
              />
              {field.state.meta.isTouched && !field.state.meta.isValid ? (
                <div className="flex w-full items-center gap-x-1">
                  <div className="text-loops-wrong size-4 shrink-0 grow-0">
                    <DangerIcon />
                  </div>
                  <p className="text-loops-wrong font-outfit text-sm leading-5">
                    {field.state.meta.errors.join(", ")}
                  </p>
                </div>
              ) : null}
            </div>
          )}
        </form.Field>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button
              className="font-outfit text-loops-light hover:bg-loops-info bg-loops-cyan w-full rounded-xl py-7 text-lg leading-5 font-semibold capitalize shadow-none"
              disabled={!canSubmit}
              type="submit"
            >
              {isSubmitting ? "Confirming..." : "Confirm Account"}
            </Button>
          )}
        </form.Subscribe>

        <div className="text-center">
          {/* Timer */}
          {timeLeft && (
            <div className="flex justify-center">
              <CountdownTimer
                initialSeconds={timeLeft}
                isActive={timeLeft > 0}
                onExpire={() => {
                  setTimeLeft(0)
                }}
              />
            </div>
          )}

          {/* Resend Section */}
          {timeLeft === 0 && (
            <RequestConfirmCode
              handleCodeExpirationChange={(leftTime) => {
                setTimeLeft(leftTime)
              }}
            />
          )}
        </div>
      </form>
    </div>
  )
}
