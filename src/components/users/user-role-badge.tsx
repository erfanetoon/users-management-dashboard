import { Badge } from "@/components/ui/badge"
import { userRoleLabels } from "@/features/users/constants"
import type { UserRole } from "@/features/users/schemas"

const roleClassNames: Record<UserRole, string> = {
  admin: "bg-primary/10 text-primary",
  manager: "bg-amber-100 text-amber-950",
  member: "bg-secondary text-secondary-foreground",
}

/** Role label with a color that stays readable on the warm page background. */
export function UserRoleBadge({ role }: { role: UserRole }) {
  return (
    <Badge variant="secondary" className={roleClassNames[role]}>
      {userRoleLabels[role]}
    </Badge>
  )
}
