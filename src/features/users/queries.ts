"use client"

import { queryOptions, useQuery } from "@tanstack/react-query"

import { fetchUserById, fetchUsers } from "@/features/users/api"
import { userQueryKeys } from "@/features/users/query-keys"
import type { UserListFilters } from "@/features/users/schemas"

/**
 * Query options live next to the hooks so the server and the client would
 * share one key if a page later prefetches. The query function stays a
 * relative fetch because these hooks run in the browser.
 */
export function userListQueryOptions(filters: UserListFilters) {
  return queryOptions({
    queryKey: userQueryKeys.list(filters),
    queryFn: () => fetchUsers(filters),
  })
}

/** Query options for a single person. Disabled until the route provides an id. */
export function userDetailQueryOptions(userId: string) {
  return queryOptions({
    queryKey: userQueryKeys.detail(userId),
    queryFn: () => fetchUserById(userId),
    enabled: userId.length > 0,
  })
}

/** Directory query for the current filters. */
export function useUserListQuery(filters: UserListFilters) {
  return useQuery(userListQueryOptions(filters))
}

/** Detail query for one person. */
export function useUserDetailQuery(userId: string) {
  return useQuery(userDetailQueryOptions(userId))
}
