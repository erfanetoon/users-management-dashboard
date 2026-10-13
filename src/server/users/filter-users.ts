import type { User, UserListFilters } from "@/features/users/schemas"

/**
 * Pure filter used by the repository.
 * Search matches name, email, department, and job title so the box behaves
 * like a directory lookup rather than an email-only search.
 */
export function filterUsers(users: User[], filters: UserListFilters): User[] {
  const search = filters.search.toLowerCase()

  return users
    .filter((user) => {
      const matchesRole = filters.role === "all" || user.role === filters.role
      const matchesStatus =
        filters.status === "all" || user.status === filters.status
      const haystack = [
        user.firstName,
        user.lastName,
        user.email,
        user.department,
        user.jobTitle,
      ]
        .join(" ")
        .toLowerCase()
      const matchesSearch = search.length === 0 || haystack.includes(search)

      return matchesRole && matchesStatus && matchesSearch
    })
    .sort((left, right) => {
      const byLastName = left.lastName.localeCompare(right.lastName)
      if (byLastName !== 0) return byLastName
      return left.firstName.localeCompare(right.firstName)
    })
}
