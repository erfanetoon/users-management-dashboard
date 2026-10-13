import type { User, UserFormValues } from "@/features/users/schemas"

/** Copies a stored user into the shape the edit form expects. */
export function toUserFormValues(user: User): UserFormValues {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    status: user.status,
    department: user.department,
    jobTitle: user.jobTitle,
  }
}
