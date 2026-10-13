"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"

import { createUser, deleteUser, updateUser } from "@/features/users/api"
import { userQueryKeys } from "@/features/users/query-keys"
import type { UserFormValues } from "@/features/users/schemas"

/**
 * Writes a new person into the detail cache and marks every list stale.
 * Lists are not updated in place because each filter combination is its own
 * cache entry, and the new person may belong to only some of them.
 */
export function useCreateUserMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (values: UserFormValues) => createUser(values),
    onSuccess: (user) => {
      queryClient.setQueryData(userQueryKeys.detail(user.id), user)
      void queryClient.invalidateQueries({ queryKey: userQueryKeys.lists() })
    },
  })
}

/**
 * Saves edits for one person.
 * The detail cache is replaced immediately so the profile page does not wait
 * for staleTime to expire. Lists are invalidated because role and status
 * filters depend on the new values.
 */
export function useUpdateUserMutation(userId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (values: UserFormValues) => updateUser(userId, values),
    onSuccess: (user) => {
      queryClient.setQueryData(userQueryKeys.detail(user.id), user)
      void queryClient.invalidateQueries({ queryKey: userQueryKeys.lists() })
    },
  })
}

/**
 * Removes a person from the cache after the API confirms the delete.
 * The detail entry is dropped so a back navigation cannot show a ghost record.
 */
export function useDeleteUserMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userId: string) => deleteUser(userId),
    onSuccess: (_result, userId) => {
      queryClient.removeQueries({ queryKey: userQueryKeys.detail(userId) })
      void queryClient.invalidateQueries({ queryKey: userQueryKeys.lists() })
    },
  })
}
