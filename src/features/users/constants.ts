/**
 * Closed sets for the directory.
 * Schemas, the API, and the form all import these tuples so a new role
 * cannot be added in only one layer.
 */

export const userRoles = ["admin", "manager", "member"] as const
export const userStatuses = ["active", "invited", "suspended"] as const

export const userRoleFilters = ["all", ...userRoles] as const
export const userStatusFilters = ["all", ...userStatuses] as const

export const userRoleLabels = {
  admin: "Admin",
  manager: "Manager",
  member: "Member",
} as const

export const userStatusLabels = {
  active: "Active",
  invited: "Invited",
  suspended: "Suspended",
} as const

export const userRoleFilterLabels = {
  all: "All roles",
  ...userRoleLabels,
} as const

export const userStatusFilterLabels = {
  all: "All statuses",
  ...userStatusLabels,
} as const
