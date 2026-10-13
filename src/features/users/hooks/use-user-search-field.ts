"use client"

import { useEffect, useState } from "react"

import { useDebouncedValue } from "@/hooks/use-debounced-value"
import type { UserListFilters } from "@/features/users/schemas"

type SetFilters = (patch: Partial<UserListFilters>) => void

/**
 * Keeps the search box responsive while the URL updates after a short pause.
 * The directory query follows the URL, so waiting here avoids a request on
 * every keystroke. If the URL changes from Clear or the browser Back button,
 * the draft is replaced during render so it does not need an effect.
 */
export function useUserSearchField(filters: UserListFilters, setFilters: SetFilters) {
  const [searchDraft, setSearchDraft] = useState(filters.search)
  const [trackedSearch, setTrackedSearch] = useState(filters.search)
  const debouncedSearch = useDebouncedValue(searchDraft, 300)

  if (filters.search !== trackedSearch) {
    setTrackedSearch(filters.search)

    if (filters.search !== debouncedSearch) {
      setSearchDraft(filters.search)
    }
  }

  useEffect(() => {
    // Wait until the draft has settled. A clear action updates the URL
    // immediately, and the old debounced text must not write itself back.
    if (searchDraft !== debouncedSearch || debouncedSearch === filters.search) {
      return
    }

    setFilters({ search: debouncedSearch })
  }, [debouncedSearch, filters.search, searchDraft, setFilters])

  return { searchDraft, setSearchDraft }
}
