import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/register")({
  component: function Register() {
    return <div>register page</div>
  },
})
