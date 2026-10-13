/**
 * Reads a JSON request body.
 * Invalid JSON becomes null so the route can answer 400 instead of throwing
 * a parse exception as a 500.
 */
export async function readJsonBody(request: Request): Promise<unknown> {
  try {
    return await request.json()
  } catch {
    return null
  }
}

/** True for the plain objects the user form sends. */
export function isJsonObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}
