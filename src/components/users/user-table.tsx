import Link from "next/link"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { UserRoleBadge } from "@/components/users/user-role-badge"
import { UserStatusBadge } from "@/components/users/user-status-badge"
import { DeleteUserButton } from "@/features/users/components/delete-user-button"
import {
  formatCreatedAt,
  formatUserInitials,
  formatUserName,
} from "@/features/users/lib/format-user"
import type { User } from "@/features/users/schemas"
import { Button } from "@/components/ui/button"

/**
 * People table.
 * The row does not navigate by itself, so Edit and Remove stay easy to hit.
 * The name is the link to the profile.
 */
export function UserTable({ users }: { users: User[] }) {
  return (
    <div className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Person</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Added</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{formatUserInitials(user)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <Link
                      href={`/users/${user.id}`}
                      className="font-medium text-foreground hover:underline"
                    >
                      {formatUserName(user)}
                    </Link>
                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <UserRoleBadge role={user.role} />
              </TableCell>
              <TableCell>
                <UserStatusBadge status={user.status} />
              </TableCell>
              <TableCell>{user.department}</TableCell>
              <TableCell>{user.jobTitle}</TableCell>
              <TableCell>{formatCreatedAt(user.createdAt)}</TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/users/${user.id}/edit`}>Edit</Link>
                  </Button>
                  <DeleteUserButton user={user} stayOnPage size="sm" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
