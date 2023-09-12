import { z } from "zod";
import { passwordSchema } from "./userSchema";

export const registerFormSchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(2, { message: "Full name must be at least 2 characters" }),
    email: z.string().email("Invalid email address"),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string({
    required_error: "Password is required",
  }),
});

export const changePasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type changePasswordPayload = z.infer<typeof changePasswordSchema>;
