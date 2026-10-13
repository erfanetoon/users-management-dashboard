import { Suspense } from "react"

import { UserDetailSkeleton } from "@/components/users/user-detail-skeleton"
import { UserDetailScreen } from "@/features/users/screens/user-detail-screen"

export const metadata = {
  title: "Profile",
}

/**
 * Profile route.
 * `params` is unwrapped inside Suspense so the skeleton can stream before the
 * client query starts.
 */
export default function UserDetailPage({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  return (
    <Suspense fallback={<UserDetailSkeleton />}>
      {params.then(({ userId }) => (
        <UserDetailScreen userId={userId} />
      ))}
    </Suspense>
  )
}
