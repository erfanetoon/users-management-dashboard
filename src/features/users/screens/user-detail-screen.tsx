"use client"

import { PageState } from "@/components/feedback/page-state"
import { PageHeader } from "@/components/layout/page-header"
import { UserDetailCard } from "@/components/users/user-detail-card"
import { UserDetailSkeleton } from "@/components/users/user-detail-skeleton"
import { formatUserName } from "@/features/users/lib/format-user"
import { useUserDetailQuery } from "@/features/users/queries"

/**
 * Profile screen for one person.
 * PageState covers the loading and missing-person cases before the card renders.
 */
export function UserDetailScreen({ userId }: { userId: string }) {
  const query = useUserDetailQuery(userId)

  return (
    <div className="flex flex-col gap-6">
      <PageState
        query={query}
        loadingFallback={
          <div className="flex flex-col gap-6">
            <PageHeader eyebrow="People" title="Loading profile" />
            <UserDetailSkeleton />
          </div>
        }
        errorTitle="This profile could not be loaded."
      >
        {(user) => (
          <div className="flex flex-col gap-6">
            <PageHeader
              eyebrow="People"
              title={formatUserName(user)}
              description="Role, access, and team for this person."
            />
            <UserDetailCard user={user} />
          </div>
        )}
      </PageState>
    </div>
  )
}
