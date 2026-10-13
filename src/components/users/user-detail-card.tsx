import Link from "next/link"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { UserRoleBadge } from "@/components/users/user-role-badge"
import { UserStatusBadge } from "@/components/users/user-status-badge"
import { DeleteUserButton } from "@/features/users/components/delete-user-button"
import {
  formatCreatedAt,
  formatUserInitials,
  formatUserName,
} from "@/features/users/lib/format-user"
import type { User } from "@/features/users/schemas"

/** Profile card. Actions are passed in so this file stays free of mutations. */
export function UserDetailCard({ user }: { user: User }) {
  const details = [
    { label: "Email", value: user.email },
    { label: "Department", value: user.department },
    { label: "Job title", value: user.jobTitle },
    { label: "Added", value: formatCreatedAt(user.createdAt) },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar size="lg">
              <AvatarFallback>{formatUserInitials(user)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2">
              <CardTitle className="text-xl">{formatUserName(user)}</CardTitle>
              <CardDescription className="flex flex-wrap gap-2">
                <UserRoleBadge role={user.role} />
                <UserStatusBadge status={user.status} />
              </CardDescription>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/users/${user.id}/edit`}>Edit</Link>
            </Button>
            <DeleteUserButton user={user} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-4 sm:grid-cols-2">
          {details.map((detail) => (
            <div key={detail.label} className="flex flex-col gap-1">
              <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {detail.label}
              </dt>
              <dd className="text-sm">{detail.value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  )
}
