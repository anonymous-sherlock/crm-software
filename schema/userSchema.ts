import { z } from "zod";

// Create user schema
export const passwordSchema = z
  .string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  })
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/[a-z]+/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/[A-Z]+/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[0-9]+/, { message: "Password must contain at least one number" })
  .regex(/[^a-zA-Z0-9]+/, {
    message: "Password must contain at least one special character",
  });

export const userSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(2, { message: "Full name must be at least 2 characters" }),
  email: z.string({
    required_error: "Email is required",

  }).email("Invalid email address"),
  password: passwordSchema,
});
