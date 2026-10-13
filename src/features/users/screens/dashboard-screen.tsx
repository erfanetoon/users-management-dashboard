"use client"

import Link from "next/link"

import { RecentUsers } from "@/components/dashboard/recent-users"
import { StatsGrid } from "@/components/dashboard/stats-grid"
import { StatsGridSkeleton } from "@/components/dashboard/stats-grid-skeleton"
import { PageState } from "@/components/feedback/page-state"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import {
  selectRecentUsers,
  summarizeUsers,
} from "@/features/users/lib/user-directory"
import { useUserListQuery } from "@/features/users/queries"
import { unfilteredUserList } from "@/features/users/schemas"

/**
 * Overview screen.
 * It reads the unfiltered list, which is the same cache entry as the people
 * page with no search. PageState is not given an empty check because zero
 * people is still a valid overview.
 */
export function DashboardScreen() {
  const query = useUserListQuery(unfilteredUserList)

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Overview"
        title="The people directory"
        description="See who is active, who is waiting on an invite, and who needs attention."
        action={
          <Button asChild>
            <Link href="/users/new">Add person</Link>
          </Button>
        }
      />
      <PageState
        query={query}
        loadingFallback={<StatsGridSkeleton />}
        errorTitle="The overview could not be loaded."
      >
        {(result) => (
          <div className="flex flex-col gap-8">
            <StatsGrid stats={summarizeUsers(result.users)} />
            <RecentUsers users={selectRecentUsers(result.users)} />
          </div>
        )}
      </PageState>
    </div>
  )
}
