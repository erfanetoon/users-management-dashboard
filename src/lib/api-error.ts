import { z } from "zod"

const apiErrorBodySchema = z.object({
  message: z.string(),
  fieldErrors: z.record(z.string(), z.string()).optional(),
})

/**
 * Error thrown by the browser API client when a request does not succeed.
 * Field errors are kept beside the message so forms can highlight inputs
 * without parsing response bodies in every screen.
 */
export class ApiError extends Error {
  readonly status: number
  readonly fieldErrors: Record<string, string>

  constructor(
    message: string,
    status: number,
    fieldErrors: Record<string, string> = {},
  ) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.fieldErrors = fieldErrors
  }

  /**
   * Builds an ApiError from a failed fetch response.
   * A non-JSON body still becomes an error so the page can show a retry state.
   */
  static async fromResponse(response: Response): Promise<ApiError> {
    let message = `Request failed with status ${response.status}.`
    let fieldErrors: Record<string, string> = {}

    try {
      const body: unknown = await response.json()
      const parsed = apiErrorBodySchema.safeParse(body)

      if (parsed.success) {
        message = parsed.data.message
        fieldErrors = parsed.data.fieldErrors ?? {}
      }
    } catch {
      // The status text above is enough when the server did not return JSON.
    }

    return new ApiError(message, response.status, fieldErrors)
  }
}

/** Narrows unknown catch values before reading status or field errors. */
export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError
}

/**
 * Message safe to show in the UI.
 * API errors already use interviewer-friendly copy. Other errors fall back
 * to a generic sentence so we never render an empty alert.
 */
export function getErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    return error.message
  }

  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message
  }

  return "Something went wrong. Try again."
}
