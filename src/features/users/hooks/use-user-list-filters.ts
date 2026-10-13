"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

import {
  parseUserListFilters,
  type UserListFilters,
} from "@/features/users/schemas"

/**
 * Stores the people filters in the URL.
 * Search, role, and status stay shareable and survive a refresh because they
 * are not kept only in component state.
 */
export function useUserListFilters() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const filters = parseUserListFilters({
    search: searchParams.get("search"),
    role: searchParams.get("role"),
    status: searchParams.get("status"),
  })

  const setFilters = useCallback(
    (patch: Partial<UserListFilters>) => {
      const nextFilters = { ...filters, ...patch }
      const params = new URLSearchParams()

      if (nextFilters.search) params.set("search", nextFilters.search)
      if (nextFilters.role !== "all") params.set("role", nextFilters.role)
      if (nextFilters.status !== "all") params.set("status", nextFilters.status)

      const query = params.toString()
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      })
    },
    [filters, pathname, router],
  )

  const clearFilters = useCallback(() => {
    router.replace(pathname, { scroll: false })
  }, [pathname, router])

  return { filters, setFilters, clearFilters }
}
