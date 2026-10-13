"use client"

import Link from "next/link"

import { PageState } from "@/components/feedback/page-state"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { UserFilters } from "@/components/users/user-filters"
import { UserTable } from "@/components/users/user-table"
import { UserTableSkeleton } from "@/components/users/user-table-skeleton"
import { useUserListFilters } from "@/features/users/hooks/use-user-list-filters"
import { useUserSearchField } from "@/features/users/hooks/use-user-search-field"
import { hasActiveUserFilters } from "@/features/users/lib/user-directory"
import { useUserListQuery } from "@/features/users/queries"

/**
 * People directory screen.
 * Filters stay outside PageState so a slow request does not hide the search box.
 * The query follows the URL filters, including the debounced search text.
 */
export function UsersScreen() {
  const { filters, setFilters, clearFilters } = useUserListFilters()
  const { searchDraft, setSearchDraft } = useUserSearchField(filters, setFilters)
  const query = useUserListQuery(filters)
  const filtersAreActive = hasActiveUserFilters(filters)

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="People"
        title="Everyone at Harbor"
        description="Search the directory, then open a person to edit their role or access."
        action={
          <Button asChild>
            <Link href="/users/new">Add person</Link>
          </Button>
        }
      />
      <UserFilters
        search={searchDraft}
        role={filters.role}
        status={filters.status}
        hasActiveFilters={filtersAreActive}
        onSearchChange={setSearchDraft}
        onRoleChange={(role) => setFilters({ role })}
        onStatusChange={(status) => setFilters({ status })}
        onClear={() => {
          setSearchDraft("")
          clearFilters()
        }}
      />
      <PageState
        query={query}
        loadingFallback={<UserTableSkeleton />}
        errorTitle="The directory could not be loaded."
        isEmpty={(result) => result.users.length === 0}
        emptyTitle={
          filtersAreActive
            ? "No one matches these filters."
            : "The directory is empty."
        }
        emptyDescription={
          filtersAreActive
            ? "Try another name, role, or status."
            : "Add the first person to start the directory."
        }
        emptyAction={
          filtersAreActive ? (
            <Button type="button" variant="outline" onClick={clearFilters}>
              Clear filters
            </Button>
          ) : (
            <Button asChild>
              <Link href="/users/new">Add person</Link>
            </Button>
          )
        }
      >
        {(result) => (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground">
              Showing {result.total} {result.total === 1 ? "person" : "people"}
            </p>
            <UserTable users={result.users} />
          </div>
        )}
      </PageState>
    </div>
  )
}
