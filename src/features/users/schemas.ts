import { z } from "zod"

import {
  userRoleFilters,
  userRoles,
  userStatusFilters,
  userStatuses,
} from "@/features/users/constants"

/**
 * Validation shared by the browser form and the route handlers.
 * Keeping one schema means the API rejects the same values the form already
 * explains, even if a request skips the UI.
 */

const personName = z
  .string()
  .trim()
  .min(2, "Use at least 2 characters.")
  .max(40, "Use 40 characters or fewer.")

export const userFormSchema = z.object({
  firstName: personName,
  lastName: personName,
  email: z
    .string()
    .trim()
    .pipe(z.email("Enter a valid work email.")),
  role: z.enum(userRoles, "Choose a role."),
  status: z.enum(userStatuses, "Choose a status."),
  department: z
    .string()
    .trim()
    .min(2, "Enter a department.")
    .max(40, "Use 40 characters or fewer."),
  jobTitle: z
    .string()
    .trim()
    .min(2, "Enter a job title.")
    .max(60, "Use 60 characters or fewer."),
})

export const userSchema = userFormSchema.extend({
  id: z.string().min(1),
  createdAt: z.iso.datetime(),
})

export const userListFiltersSchema = z.object({
  search: z.string().trim().max(80).optional().default(""),
  role: z.enum(userRoleFilters).optional().default("all"),
  status: z.enum(userStatusFilters).optional().default("all"),
})

export const userListResultSchema = z.object({
  users: z.array(userSchema),
  total: z.number().int().nonnegative(),
})

export const userResponseSchema = z.object({
  user: userSchema,
})

export type UserFormValues = z.infer<typeof userFormSchema>
export type User = z.infer<typeof userSchema>
export type UserRole = User["role"]
export type UserStatus = User["status"]
export type UserListFilters = z.infer<typeof userListFiltersSchema>
export type UserListResult = z.infer<typeof userListResultSchema>

/** Values for the create form before the person has typed anything. */
export const emptyUserFormValues: UserFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  role: "member",
  status: "invited",
  department: "",
  jobTitle: "",
}

/** Filters for the full directory. The overview and the unfiltered list share this key. */
export const unfilteredUserList: UserListFilters = {
  search: "",
  role: "all",
  status: "all",
}

/**
 * Reads filters from a URL or request.
 * An unknown role or status falls back to the full directory instead of
 * failing the page, because a shared link should still open.
 */
export function parseUserListFilters(input: {
  search?: string | null
  role?: string | null
  status?: string | null
}): UserListFilters {
  const parsed = userListFiltersSchema.safeParse({
    search: input.search || undefined,
    role: input.role || undefined,
    status: input.status || undefined,
  })

  if (parsed.success) {
    return parsed.data
  }

  return unfilteredUserList
}

/**
 * Turns a Zod error into one message per form field.
 * Only the first message is kept so the field shows the earliest failed rule.
 */
export function collectFieldErrors(error: z.ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {}

  for (const issue of error.issues) {
    const fieldName = issue.path[0]

    if (typeof fieldName !== "string" || fieldErrors[fieldName]) {
      continue
    }

    fieldErrors[fieldName] = issue.message
  }

  return fieldErrors
}
