import type { FieldPath, FieldValues, UseFormReturn } from "react-hook-form"

import { isApiError } from "@/lib/api-error"

/**
 * Copies server field errors onto the matching form inputs.
 * Returns false when the response has no field map, so the caller can show
 * the message at the top of the form instead.
 */
export function applyApiFieldErrors<TValues extends FieldValues>(
  form: UseFormReturn<TValues>,
  error: unknown,
) {
  if (!isApiError(error)) {
    return false
  }

  const values = form.getValues()
  let applied = false

  for (const [field, message] of Object.entries(error.fieldErrors)) {
    if (!message || !(field in values)) {
      continue
    }

    form.setError(field as FieldPath<TValues>, { message })
    applied = true
  }

  return applied
}
