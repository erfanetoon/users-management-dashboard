"use client"

import { cn } from "cn"
import { LayoutDashboardIcon, UsersIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ComponentType } from "react"

type NavigationItem = {
  href: string
  label: string
  icon: ComponentType<{ className?: string }>
}

const navigationItems: NavigationItem[] = [
  { href: "/", label: "Overview", icon: LayoutDashboardIcon },
  { href: "/users", label: "People", icon: UsersIcon },
]

/**
 * True when the current URL belongs to a nav item.
 * Overview is exact so "/" does not stay active on every route.
 * People stays active on detail, create, and edit pages.
 */
function isNavigationItemActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/"
  }

  return pathname === href || pathname.startsWith(`${href}/`)
}

/** Product mark and name. Compact mode is the mobile bar, which has less room. */
function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span className="flex size-9 items-center justify-center rounded-lg bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground">
        H
      </span>
      {compact ? null : (
        <span className="flex flex-col">
          <span className="font-heading text-lg leading-none">Harbor</span>
          <span className="mt-1 text-xs text-sidebar-foreground/70">
            People directory
          </span>
        </span>
      )}
    </Link>
  )
}

function NavigationLinks({ pathname }: { pathname: string }) {
  return (
    <>
      {navigationItems.map((item) => {
        const Icon = item.icon
        const isActive = isNavigationItemActive(pathname, item.href)

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
            )}
          >
            <Icon className="size-4" />
            {item.label}
          </Link>
        )
      })}
    </>
  )
}

/**
 * Primary navigation.
 * Desktop gets a full sidebar. Small screens get the same links in a top bar
 * so the directory stays usable without a second menu component.
 */
export function SidebarNav() {
  const pathname = usePathname()

  return (
    <>
      <aside className="hidden w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground md:flex md:min-h-full">
        <div className="px-5 pt-6 pb-2">
          <Brand />
        </div>
        <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
          <NavigationLinks pathname={pathname} />
        </nav>
        <p className="px-6 py-5 text-xs leading-5 text-sidebar-foreground/70">
          Local directory. Changes stay in a data file on this machine.
        </p>
      </aside>
      <div className="flex items-center justify-between gap-4 border-b border-sidebar-border bg-sidebar px-4 py-3 text-sidebar-foreground md:hidden">
        <Brand compact />
        <nav className="flex gap-1">
          <NavigationLinks pathname={pathname} />
        </nav>
      </div>
    </>
  )
}
