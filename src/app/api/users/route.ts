import {
  parseUserListFilters,
  userFormSchema,
} from "@/features/users/schemas"
import { isJsonObject, readJsonBody } from "@/server/http/read-json-body"
import { jsonError } from "@/server/http/json-error"
import { userErrorResponse, validationError } from "@/server/users/http"
import { createUser, listUsers } from "@/server/users/user-repository"

/**
 * Collection route.
 * Reading `request.url` keeps the handler dynamic, so the file store is read
 * on each request instead of being frozen at build time.
 */

export async function GET(request: Request) {
  const url = new URL(request.url)
  const filters = parseUserListFilters({
    search: url.searchParams.get("search"),
    role: url.searchParams.get("role"),
    status: url.searchParams.get("status"),
  })
  const result = await listUsers(filters)

  return Response.json(result)
}

/** Creates a person after the shared form schema accepts the body. */
export async function POST(request: Request) {
  const body = await readJsonBody(request)

  if (!isJsonObject(body)) {
    return jsonError(400, "Request body must be a JSON object.")
  }

  const parsed = userFormSchema.safeParse(body)

  if (!parsed.success) {
    return validationError(parsed.error)
  }

  try {
    const user = await createUser(parsed.data)
    return Response.json({ user }, { status: 201 })
  } catch (error) {
    const response = userErrorResponse(error)
    if (response) return response
    throw error
  }
}
