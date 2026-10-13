"use client"

import { PageState } from "@/components/feedback/page-state"
import { PageHeader } from "@/components/layout/page-header"
import { UserFormSkeleton } from "@/components/users/user-form-skeleton"
import { EditUserFormPanel } from "@/features/users/components/user-form-panel"
import { formatUserName } from "@/features/users/lib/format-user"
import { useUserDetailQuery } from "@/features/users/queries"

/**
 * Edit screen.
 * The form panel is rendered only in the success branch so its default values
 * come from the loaded person.
 */
export function EditUserScreen({ userId }: { userId: string }) {
  const query = useUserDetailQuery(userId)

  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <PageState
        query={query}
        loadingFallback={
          <div className="flex flex-col gap-6">
            <PageHeader eyebrow="People" title="Edit profile" />
            <UserFormSkeleton />
          </div>
        }
        errorTitle="This profile could not be loaded."
      >
        {(user) => (
          <div className="flex flex-col gap-6">
            <PageHeader
              eyebrow="People"
              title={`Edit ${formatUserName(user)}`}
              description="Updates are checked with the same rules as the create form."
            />
            <EditUserFormPanel user={user} />
          </div>
        )}
      </PageState>
    </div>
  )
}
