import { createRouter as createTanStackRouter } from "@tanstack/react-router"

import { routeTree } from "./routeTree.gen"

export function createRouter() {
  return createTanStackRouter({
    defaultNotFoundComponent: function NotFound() {
      return <h1>Page not found</h1>
    },
    routeTree,
    scrollRestoration: true,
  })
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
