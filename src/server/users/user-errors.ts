/** Raised when a write uses an email that another person already has. */
export class DuplicateEmailError extends Error {
  constructor() {
    super("A person with this email is already in the directory.")
    this.name = "DuplicateEmailError"
  }
}

/** Raised when a detail, update, or delete targets an unknown id. */
export class UserNotFoundError extends Error {
  constructor() {
    super("That person is no longer in the directory.")
    this.name = "UserNotFoundError"
  }
}
