import { Badge } from "@/components/ui/badge"
import { userStatusLabels } from "@/features/users/constants"
import type { UserStatus } from "@/features/users/schemas"

const statusClassNames: Record<UserStatus, string> = {
  active: "bg-emerald-100 text-emerald-950",
  invited: "bg-amber-100 text-amber-950",
  suspended: "bg-rose-100 text-rose-950",
}

/** Status label. Color is the quick scan signal in the table. */
export function UserStatusBadge({ status }: { status: UserStatus }) {
  return (
    <Badge variant="secondary" className={statusClassNames[status]}>
      {userStatusLabels[status]}
    </Badge>
  )
}
