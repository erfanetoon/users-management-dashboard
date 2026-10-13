"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { UserForm } from "@/components/users/user-form"
import { useUserForm } from "@/features/users/hooks/use-user-form"
import { useCreateUserMutation, useUpdateUserMutation } from "@/features/users/mutations"
import { toUserFormValues } from "@/features/users/lib/to-user-form-values"
import {
  emptyUserFormValues,
  type User,
} from "@/features/users/schemas"

/**
 * Create form wired to the create mutation.
 * The button uses the mutation's pending state, not the form's, so a failed
 * Zod check does not show "Saving...". Navigation happens only after the API
 * accepts the person.
 */
export function CreateUserFormPanel() {
  const router = useRouter()
  const mutation = useCreateUserMutation()
  const controller = useUserForm({
    defaultValues: emptyUserFormValues,
    onSubmit: async (values) => {
      const user = await mutation.mutateAsync(values)
      toast.success("Person added to the directory.")
      router.push(`/users/${user.id}`)
    },
  })

  return (
    <UserForm
      form={controller.form}
      onSubmit={controller.onSubmit}
      isSubmitting={mutation.isPending}
      submitLabel="Add person"
      cancelHref="/users"
    />
  )
}

/**
 * Edit form wired to the update mutation.
 * Mount this only after the person has loaded. React Hook Form keeps the
 * first default values, so an empty form must not render while the query is pending.
 */
export function EditUserFormPanel({ user }: { user: User }) {
  const router = useRouter()
  const mutation = useUpdateUserMutation(user.id)
  const controller = useUserForm({
    defaultValues: toUserFormValues(user),
    onSubmit: async (values) => {
      await mutation.mutateAsync(values)
      toast.success("Changes saved.")
      router.push(`/users/${user.id}`)
    },
  })

  return (
    <UserForm
      form={controller.form}
      onSubmit={controller.onSubmit}
      isSubmitting={mutation.isPending}
      submitLabel="Save changes"
      cancelHref={`/users/${user.id}`}
    />
  )
}
