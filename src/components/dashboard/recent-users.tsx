import Link from "next/link"

import { UserRoleBadge } from "@/components/users/user-role-badge"
import { UserStatusBadge } from "@/components/users/user-status-badge"
import { formatUserName } from "@/features/users/lib/format-user"
import type { User } from "@/features/users/schemas"

/**
 * Short list of the newest people on the overview.
 * An empty array is a valid success, so this component explains that itself
 * instead of asking PageState to treat zero people as an error.
 */
export function RecentUsers({ users }: { users: User[] }) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-end justify-between gap-3">
        <h2 className="font-heading text-xl font-medium">Recently added</h2>
        <Link href="/users" className="text-sm font-medium text-primary hover:underline">
          View directory
        </Link>
      </div>
      {users.length === 0 ? (
        <p className="rounded-xl bg-card px-4 py-8 text-sm text-muted-foreground ring-1 ring-foreground/10">
          No one is in the directory yet.
        </p>
      ) : (
        <ul className="divide-y divide-border overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
          {users.map((user) => (
            <li key={user.id}>
              <Link
                href={`/users/${user.id}`}
                className="flex flex-col gap-2 px-4 py-3 transition-colors hover:bg-muted/60 sm:flex-row sm:items-center sm:justify-between"
              >
                <span>
                  <span className="block text-sm font-medium">
                    {formatUserName(user)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {user.jobTitle} · {user.department}
                  </span>
                </span>
                <span className="flex gap-2">
                  <UserRoleBadge role={user.role} />
                  <UserStatusBadge status={user.status} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
