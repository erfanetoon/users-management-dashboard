import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

import { userSchema, type User, type UserFormValues, type UserListFilters } from "@/features/users/schemas"
import { filterUsers } from "@/server/users/filter-users"
import { seedUsers } from "@/server/users/seed-users"
import { DuplicateEmailError, UserNotFoundError } from "@/server/users/user-errors"

/**
 * File-backed directory for the demo.
 * There is no database. The JSON file survives refreshes, and deleting it
 * restores the seed the next time the API is called.
 * Writes are queued in this process because two overlapping writes would
 * otherwise replace the whole file with stale contents.
 */

const dataDirectory = path.join(process.cwd(), "data")
const dataFilePath = path.join(dataDirectory, "users.json")

let operationQueue: Promise<unknown> = Promise.resolve()

function enqueue<TResult>(operation: () => Promise<TResult>): Promise<TResult> {
  const result = operationQueue.then(operation, operation)
  operationQueue = result.then(
    () => undefined,
    () => undefined,
  )
  return result
}

function isMissingFile(error: unknown) {
  return (
    error instanceof Error &&
    "code" in error &&
    (error as NodeJS.ErrnoException).code === "ENOENT"
  )
}

async function persistUsers(users: User[]) {
  await mkdir(dataDirectory, { recursive: true })
  await writeFile(dataFilePath, JSON.stringify(users, null, 2), "utf8")
}

async function readStoredUsers(): Promise<User[]> {
  try {
    const raw = await readFile(dataFilePath, "utf8")
    return userSchema.array().parse(JSON.parse(raw))
  } catch (error) {
    if (!isMissingFile(error)) {
      throw error
    }

    await persistUsers(seedUsers)
    return seedUsers
  }
}

function emailsMatch(left: string, right: string) {
  return left.toLowerCase() === right.toLowerCase()
}

function assertUniqueEmail(users: User[], email: string, ignoreUserId?: string) {
  const duplicate = users.find(
    (user) => emailsMatch(user.email, email) && user.id !== ignoreUserId,
  )

  if (duplicate) {
    throw new DuplicateEmailError()
  }
}

/** Returns the people that match the current filters, plus the match count. */
export function listUsers(filters: UserListFilters) {
  return enqueue(async () => {
    const users = filterUsers(await readStoredUsers(), filters)
    return { users, total: users.length }
  })
}

/** Returns one person or throws UserNotFoundError. */
export function getUserById(userId: string) {
  return enqueue(async () => {
    const user = (await readStoredUsers()).find((item) => item.id === userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    return user
  })
}

/** Stores a new person. The id and createdAt are assigned here, not by the form. */
export function createUser(input: UserFormValues) {
  return enqueue(async () => {
    const users = await readStoredUsers()
    assertUniqueEmail(users, input.email)

    const user: User = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }

    await persistUsers([...users, user])
    return user
  })
}

/**
 * Replaces editable fields and keeps id and createdAt.
 * Email uniqueness ignores the person being edited.
 */
export function updateUser(userId: string, input: UserFormValues) {
  return enqueue(async () => {
    const users = await readStoredUsers()
    const existing = users.find((user) => user.id === userId)

    if (!existing) {
      throw new UserNotFoundError()
    }

    assertUniqueEmail(users, input.email, userId)

    const updatedUser: User = {
      ...existing,
      ...input,
      id: existing.id,
      createdAt: existing.createdAt,
    }

    await persistUsers(
      users.map((user) => (user.id === userId ? updatedUser : user)),
    )
    return updatedUser
  })
}

/** Deletes a person. A second delete of the same id is a 404, not a success. */
export function deleteUser(userId: string) {
  return enqueue(async () => {
    const users = await readStoredUsers()
    const exists = users.some((user) => user.id === userId)

    if (!exists) {
      throw new UserNotFoundError()
    }

    await persistUsers(users.filter((user) => user.id !== userId))
  })
}
