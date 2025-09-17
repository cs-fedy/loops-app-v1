/// <reference types="vite/client" />
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router"
import appCss from "../styles/app.css?url"
import type { RouterContext } from "@/router"
import { Toaster } from "@/components/ui/sonner"

export const Route = createRootRouteWithContext<RouterContext>()({
  component: function RootComponent() {
    return (
      <html>
        <head>
          <HeadContent />
        </head>
        <body>
          <Outlet />
          <Toaster 
            position="bottom-right"
            expand={false}
            richColors={false}
            closeButton={true}
            toastOptions={{
              style: {
                borderRadius: "0.75rem",
                fontSize: "0.875rem",
                fontWeight: "500",
              },
            }}
          />
          <Scripts />
        </body>
      </html>
    )
  },
  head: () => ({
    links: [{ href: appCss, rel: "stylesheet" }],
    meta: [
      { charSet: "utf-8" },
      {
        content: "width=device-width, initial-scale=1",
        name: "viewport",
      },
      {
        title: "Loops",
      },
    ],
  }),
})
