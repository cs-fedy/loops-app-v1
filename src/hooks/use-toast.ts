import { toast as sonnerToast } from "sonner"

export interface ToastOptions {
  duration?: number
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center"
  dismissible?: boolean
  description?: string
}

export interface UseToastReturn {
  success: (message: string, options?: ToastOptions) => void
  error: (message: string, options?: ToastOptions) => void
  dismiss: (id?: string | number) => void
}

export const useToast = (): UseToastReturn => {
  const success = (message: string, options: ToastOptions = {}) => {
    const {
      duration = 5000,
      dismissible = true,
      description,
    } = options

    sonnerToast.success(message, {
      duration,
      dismissible,
      description,
      className: "toast-success",
      style: {
        background: "var(--color-success)",
        color: "var(--color-success-foreground)",
        border: "1px solid var(--color-success-border)",
        borderRadius: "0.75rem",
        fontSize: "0.875rem",
        fontWeight: "500",
        boxShadow: "0 4px 12px rgba(16, 185, 129, 0.15)",
      },
    })
  }

  const error = (message: string, options: ToastOptions = {}) => {
    const {
      duration = 5000,
      dismissible = true,
      description,
    } = options

    sonnerToast.error(message, {
      duration,
      dismissible,
      description,
      className: "toast-error",
      style: {
        background: "var(--color-destructive)",
        color: "var(--color-destructive-foreground)",
        border: "1px solid var(--color-destructive-border)",
        borderRadius: "0.75rem",
        fontSize: "0.875rem",
        fontWeight: "500",
        boxShadow: "0 4px 12px rgba(239, 68, 68, 0.15)",
      },
    })
  }

  const dismiss = (id?: string | number) => {
    if (id) {
      sonnerToast.dismiss(id)
    } else {
      sonnerToast.dismiss()
    }
  }

  return {
    success,
    error,
    dismiss,
  }
}
