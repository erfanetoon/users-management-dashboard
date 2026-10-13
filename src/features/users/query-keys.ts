import type { UserListFilters } from "@/features/users/schemas"

/**
 * Cache identities for the directory.
 * Screens and mutations import these helpers instead of writing key arrays
 * inline, so a list update invalidates every filtered list the same way.
 */
export const userQueryKeys = {
  all: ["users"] as const,
  lists: () => [...userQueryKeys.all, "list"] as const,
  list: (filters: UserListFilters) =>
    [...userQueryKeys.lists(), filters] as const,
  details: () => [...userQueryKeys.all, "detail"] as const,
  detail: (userId: string) => [...userQueryKeys.details(), userId] as const,
}
