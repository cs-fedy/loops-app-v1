import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/reset-password")({
  component: function RouteComponent() {
    return <div>Hello reset password!</div>
  },
})
