import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: function Home() {
    return <h1>hello world</h1>
  },
})
