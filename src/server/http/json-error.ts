export type ApiErrorBody = {
  message: string
  fieldErrors?: Record<string, string>
}

/**
 * JSON error used by every route handler.
 * The shape matches `ApiError.fromResponse` on the client.
 */
export function jsonError(
  status: number,
  message: string,
  fieldErrors?: Record<string, string>,
) {
  const body: ApiErrorBody = fieldErrors ? { message, fieldErrors } : { message }
  return Response.json(body, { status })
}
