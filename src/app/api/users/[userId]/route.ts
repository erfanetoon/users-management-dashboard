import { userFormSchema } from "@/features/users/schemas"
import { isJsonObject, readJsonBody } from "@/server/http/read-json-body"
import { jsonError } from "@/server/http/json-error"
import { userErrorResponse, validationError } from "@/server/users/http"
import {
  deleteUser,
  getUserById,
  updateUser,
} from "@/server/users/user-repository"

type UserRouteContext = {
  params: Promise<{ userId: string }>
}

/** Loads one person by id. */
export async function GET(_request: Request, context: UserRouteContext) {
  const { userId } = await context.params

  try {
    const user = await getUserById(userId)
    return Response.json({ user })
  } catch (error) {
    const response = userErrorResponse(error)
    if (response) return response
    throw error
  }
}

/** Updates the editable fields of one person. */
export async function PATCH(request: Request, context: UserRouteContext) {
  const { userId } = await context.params
  const body = await readJsonBody(request)

  if (!isJsonObject(body)) {
    return jsonError(400, "Request body must be a JSON object.")
  }

  const parsed = userFormSchema.safeParse(body)

  if (!parsed.success) {
    return validationError(parsed.error)
  }

  try {
    const user = await updateUser(userId, parsed.data)
    return Response.json({ user })
  } catch (error) {
    const response = userErrorResponse(error)
    if (response) return response
    throw error
  }
}

/** Removes one person. A missing id is 404 so the client can show that copy. */
export async function DELETE(_request: Request, context: UserRouteContext) {
  const { userId } = await context.params

  try {
    await deleteUser(userId)
    return Response.json({ id: userId })
  } catch (error) {
    const response = userErrorResponse(error)
    if (response) return response
    throw error
  }
}
