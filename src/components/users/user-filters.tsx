"use client"

import { SearchIcon } from "lucide-react"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
  userRoleFilterLabels,
  userRoleFilters,
  userStatusFilterLabels,
  userStatusFilters,
} from "@/features/users/constants"
import type { UserListFilters } from "@/features/users/schemas"

type UserFiltersProps = {
  search: string
  role: UserListFilters["role"]
  status: UserListFilters["status"]
  hasActiveFilters: boolean
  onSearchChange: (value: string) => void
  onRoleChange: (value: UserListFilters["role"]) => void
  onStatusChange: (value: UserListFilters["status"]) => void
  onClear: () => void
}

function isRoleFilter(value: string): value is UserListFilters["role"] {
  return userRoleFilters.some((role) => role === value)
}

function isStatusFilter(value: string): value is UserListFilters["status"] {
  return userStatusFilters.some((status) => status === value)
}

/**
 * Filter bar for the people page.
 * This component only reports changes. The screen decides how search is
 * debounced and how the URL is updated.
 */
export function UserFilters({
  search,
  role,
  status,
  hasActiveFilters,
  onSearchChange,
  onRoleChange,
  onStatusChange,
  onClear,
}: UserFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl bg-card p-3 ring-1 ring-foreground/10 md:flex-row md:items-center">
      <div className="relative min-w-0 flex-1">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search name, email, or team"
          aria-label="Search people"
          className="pl-8"
        />
      </div>
      <Select
        value={role}
        onValueChange={(value) => {
          if (isRoleFilter(value)) onRoleChange(value)
        }}
      >
        <SelectTrigger className="w-full md:w-40" aria-label="Filter by role">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {userRoleFilters.map((item) => (
            <SelectItem key={item} value={item}>
              {userRoleFilterLabels[item]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={status}
        onValueChange={(value) => {
          if (isStatusFilter(value)) onStatusChange(value)
        }}
      >
        <SelectTrigger className="w-full md:w-40" aria-label="Filter by status">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {userStatusFilters.map((item) => (
            <SelectItem key={item} value={item}>
              {userStatusFilterLabels[item]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {hasActiveFilters ? (
        <Button type="button" variant="ghost" onClick={onClear}>
          Clear
        </Button>
      ) : null}
    </div>
  )
}
