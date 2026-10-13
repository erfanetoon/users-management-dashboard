import type { User, UserListFilters } from "@/features/users/schemas"

export type UserDirectoryStats = {
  total: number
  active: number
  invited: number
  suspended: number
}

/** True when the list URL is narrower than the full directory. */
export function hasActiveUserFilters(filters: UserListFilters) {
  return (
    filters.search.length > 0 ||
    filters.role !== "all" ||
    filters.status !== "all"
  )
}

/**
 * Counts the directory for the overview cards.
 * The numbers come from the same list query the people page uses, so the
 * overview and the table cannot disagree about who is active.
 */
export function summarizeUsers(users: User[]): UserDirectoryStats {
  return users.reduce<UserDirectoryStats>(
    (stats, user) => {
      stats.total += 1

      if (user.status === "active") stats.active += 1
      if (user.status === "invited") stats.invited += 1
      if (user.status === "suspended") stats.suspended += 1

      return stats
    },
    { total: 0, active: 0, invited: 0, suspended: 0 },
  )
}

/** Newest records first. The input array is left unchanged. */
export function selectRecentUsers(users: User[], limit = 5) {
  return [...users]
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
    .slice(0, limit)
}
