import { createFileRoute } from "@tanstack/react-router"
import { ToastDemo } from "@/components/toast-demo"

export const Route = createFileRoute("/toast-demo")({
  component: function ToastDemoPage() {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-2xl w-full mx-auto">
          <ToastDemo />
        </div>
      </div>
    )
  },
})
