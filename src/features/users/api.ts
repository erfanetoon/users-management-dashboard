import { z } from "zod"

import { ApiError } from "@/lib/api-error"
import {
  userListResultSchema,
  userResponseSchema,
  type User,
  type UserFormValues,
  type UserListFilters,
  type UserListResult,
} from "@/features/users/schemas"

/**
 * Browser client for `/api/users`.
 * Responses are parsed with the same Zod schemas the server writes, so a
 * mismatched payload becomes a query error instead of a crash inside the table.
 */

async function requestJson<TData>(
  path: string,
  schema: z.ZodType<TData>,
  init?: RequestInit,
): Promise<TData> {
  const response = await fetch(path, {
    ...init,
    cache: "no-store",
    headers: {
      Accept: "application/json",
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
  })

  if (!response.ok) {
    throw await ApiError.fromResponse(response)
  }

  const body: unknown = await response.json()
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    throw new ApiError("The server returned an unexpected response.", 500)
  }

  return parsed.data
}

function userCollectionPath(filters: UserListFilters) {
  const params = new URLSearchParams()

  if (filters.search) params.set("search", filters.search)
  if (filters.role !== "all") params.set("role", filters.role)
  if (filters.status !== "all") params.set("status", filters.status)

  const query = params.toString()
  return query ? `/api/users?${query}` : "/api/users"
}

function userPath(userId: string) {
  return `/api/users/${encodeURIComponent(userId)}`
}

/** Loads the directory for the current search, role, and status. */
export function fetchUsers(filters: UserListFilters): Promise<UserListResult> {
  return requestJson(userCollectionPath(filters), userListResultSchema)
}

/** Loads one person. A missing id rejects with a 404 ApiError. */
export async function fetchUserById(userId: string): Promise<User> {
  const response = await requestJson(userPath(userId), userResponseSchema)
  return response.user
}

/** Creates a person and returns the stored record, including id and createdAt. */
export async function createUser(values: UserFormValues): Promise<User> {
  const response = await requestJson("/api/users", userResponseSchema, {
    method: "POST",
    body: JSON.stringify(values),
  })
  return response.user
}

/** Replaces the editable fields of an existing person. */
export async function updateUser(
  userId: string,
  values: UserFormValues,
): Promise<User> {
  const response = await requestJson(userPath(userId), userResponseSchema, {
    method: "PATCH",
    body: JSON.stringify(values),
  })
  return response.user
}

/** Removes a person. The server answers with the deleted id, not an empty body. */
export async function deleteUser(userId: string): Promise<void> {
  const response = await fetch(userPath(userId), {
    method: "DELETE",
    cache: "no-store",
  })

  if (!response.ok) {
    throw await ApiError.fromResponse(response)
  }
}
