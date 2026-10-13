"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type UseFormReturn } from "react-hook-form"
import type { FormEvent } from "react"

import { applyApiFieldErrors } from "@/features/users/lib/apply-api-field-errors"
import {
  userFormSchema,
  type UserFormValues,
} from "@/features/users/schemas"
import { getErrorMessage } from "@/lib/api-error"

type UseUserFormOptions = {
  defaultValues: UserFormValues
  onSubmit: (values: UserFormValues) => Promise<void>
}

type UseUserFormResult = {
  form: UseFormReturn<UserFormValues>
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

/**
 * Connects React Hook Form to the shared user schema.
 * The screen passes the mutation. This hook only owns validation, submission,
 * and mapping API field errors back onto the inputs.
 */
export function useUserForm({
  defaultValues,
  onSubmit,
}: UseUserFormOptions): UseUserFormResult {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues,
  })

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      await onSubmit(values)
    } catch (error) {
      const applied = applyApiFieldErrors(form, error)

      if (!applied) {
        form.setError("root", { message: getErrorMessage(error) })
      }
    }
  })

  return {
    form,
    onSubmit: handleSubmit,
  }
}
