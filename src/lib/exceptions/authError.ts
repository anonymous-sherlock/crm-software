export class AuthError extends Error {
  success: boolean;

  constructor(message: string, success: boolean) {
    super(message); // Calling the Error constructor with the message
    this.name = "AuthorizationError"; // Custom error name
    this.success = success; // Assigning the status property
  }
}
