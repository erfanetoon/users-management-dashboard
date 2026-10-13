import type { User } from "@/features/users/schemas"

/** Display name used by the table, detail page, and toasts. */
export function formatUserName(user: Pick<User, "firstName" | "lastName">) {
  return `${user.firstName} ${user.lastName}`
}

/** Two letters for the avatar when there is no photo. */
export function formatUserInitials(
  user: Pick<User, "firstName" | "lastName">,
) {
  return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
}

/**
 * Short calendar date in UTC.
 * The timestamp is stored in UTC, and formatting in the server timezone
 * would not match the browser.
 */
export function formatCreatedAt(createdAt: string) {
  const date = new Date(createdAt)

  if (Number.isNaN(date.getTime())) {
    return ""
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date)
}
