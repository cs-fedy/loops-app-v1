import { CodeInputGroup } from "@/modules/shared/components/common/code-input-group"
import { DangerIcon } from "@/modules/shared/components/icons/danger"
import { Button } from "@/modules/shared/components/ui/button"
import { useToast } from "@/modules/shared/hooks/use-toast"
import { useForm } from "@tanstack/react-form"
import { useSubmitVoucher } from "../services/use-submit-voucher"

type VoucherSubmissionFormProps = {
  categoryId: string
  onSuccess: () => void
}

export function VoucherSubmissionForm({
  categoryId,
  onSuccess,
}: VoucherSubmissionFormProps) {
  const { error } = useToast()
  const { handleSubmitVoucher } = useSubmitVoucher()

  const form = useForm({
    defaultValues: { code: "" },
    validators: {
      onSubmitAsync: async ({ value }) => {
        const code = parseInt(value.code, 10)
        if (isNaN(code) || value.code.length !== 5)
          return { voucherCode: "Please enter a valid 5-digit voucher code" }

        const response = await handleSubmitVoucher(categoryId, code)

        if (response._tag === "Failure") {
          if (response.error.code === "invalid_input")
            return { voucherCode: response.error.payload.code }
          error("Invalid voucher code. Please check and try again.")
        }

        onSuccess()
      },
    },
  })

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <form.Field name="code">
        {(field) => (
          <div className="space-y-2">
            <CodeInputGroup
              length={5}
              onChange={(value) => field.handleChange(value)}
            />
            {field.state.meta.isTouched && !field.state.meta.isValid && (
              <div className="flex w-full items-center gap-x-2">
                <div className="text-loops-wrong size-4 shrink-0 grow-0">
                  <DangerIcon />
                </div>
                <p className="text-loops-wrong font-outfit text-sm leading-5">
                  {field.state.meta.errors.join(", ")}
                </p>
              </div>
            )}
          </div>
        )}
      </form.Field>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button
            className="font-outfit text-loops-light hover:bg-loops-info bg-loops-cyan w-full rounded-xl py-6 text-base leading-5 font-semibold capitalize shadow-none transition-all duration-200"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Submitting..." : "Submit Voucher"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  )
}
