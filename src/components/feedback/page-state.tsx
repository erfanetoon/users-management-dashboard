"use client"

import type { ReactNode } from "react"
import type { UseQueryResult } from "@tanstack/react-query"

import { EmptyState } from "@/components/feedback/empty-state"
import { ErrorState } from "@/components/feedback/error-state"
import { LoadingState } from "@/components/feedback/loading-state"

type PageStateProps<TData> = {
  query: UseQueryResult<TData, Error>
  children: (data: TData) => ReactNode
  isEmpty?: (data: TData) => boolean
  loadingFallback?: ReactNode
  loadingLabel?: string
  errorTitle?: string
  emptyTitle?: string
  emptyDescription?: string
  emptyAction?: ReactNode
}

/**
 * Global wrapper for data pages.
 *
 * Give it any TanStack Query result. It picks one view, in this order:
 * 1. pending with no data yet -> loading
 * 2. failed with no data -> error, with retry
 * 3. successful data that the page calls empty -> empty
 * 4. otherwise -> the page renders the data
 *
 * `status` is used instead of `isFetching`. A background refetch keeps the
 * last successful data on screen. `isFetching` would flash the skeleton every
 * time the cache refreshes. `status` also lets TypeScript treat `data` as
 * present in the success branch.
 *
 * Expected API failures stay in this wrapper. Unexpected render crashes are
 * handled separately by `src/app/error.tsx`.
 */
export function PageState<TData>({
  query,
  children,
  isEmpty,
  loadingFallback,
  loadingLabel,
  errorTitle,
  emptyTitle = "Nothing to show yet.",
  emptyDescription = "Once there is data, it will show up here.",
  emptyAction,
}: PageStateProps<TData>) {
  if (query.status === "pending") {
    return loadingFallback ?? <LoadingState label={loadingLabel} />
  }

  if (query.status === "error") {
    return (
      <ErrorState
        title={errorTitle}
        error={query.error}
        onRetry={() => {
          void query.refetch()
        }}
      />
    )
  }

  if (isEmpty?.(query.data)) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        action={emptyAction}
      />
    )
  }

  return children(query.data)
}
