import { collectFieldErrors } from "@/features/users/schemas"
import { jsonError } from "@/server/http/json-error"
import {
  DuplicateEmailError,
  UserNotFoundError,
} from "@/server/users/user-errors"
import type { z } from "zod"

/** Maps a failed form schema to the field errors the client form understands. */
export function validationError(error: z.ZodError) {
  return jsonError(
    400,
    "Check the highlighted fields.",
    collectFieldErrors(error),
  )
}

/**
 * Maps known directory failures to HTTP responses.
 * Returns null for anything else so the route can rethrow and let Next.js
 * log an unexpected 500.
 */
export function userErrorResponse(error: unknown) {
  if (error instanceof UserNotFoundError) {
    return jsonError(404, error.message)
  }

  if (error instanceof DuplicateEmailError) {
    return jsonError(409, error.message, { email: error.message })
  }

  return null
}
