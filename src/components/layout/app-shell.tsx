import { Suspense, type ReactNode } from "react"

import { SidebarNav } from "@/components/layout/sidebar-nav"

/**
 * Placeholder with the same width as the desktop sidebar.
 * The real nav reads the current URL, which is only known on a request,
 * so this fallback lets the rest of the shell render immediately.
 */
function SidebarFallback() {
  return <div className="hidden w-64 shrink-0 bg-sidebar md:block md:min-h-full" />
}

/**
 * Frame around every page: navigation plus a centered content column.
 * Pages only render their own header and body. They do not repeat the sidebar.
 * The nav is inside Suspense because it calls `usePathname`.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col md:flex-row">
      <Suspense fallback={<SidebarFallback />}>
        <SidebarNav />
      </Suspense>
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-6 sm:px-8 sm:py-8">
          {children}
        </main>
      </div>
    </div>
  )
}
