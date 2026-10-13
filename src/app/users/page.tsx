import { Suspense } from "react"

import { UserTableSkeleton } from "@/components/users/user-table-skeleton"
import { UsersScreen } from "@/features/users/screens/users-screen"

export const metadata = {
  title: "People",
}

/**
 * People route.
 * Suspense also covers `useSearchParams` inside the filter hook.
 */
export default function UsersPage() {
  return (
    <Suspense fallback={<UserTableSkeleton />}>
      <UsersScreen />
    </Suspense>
  )
}
