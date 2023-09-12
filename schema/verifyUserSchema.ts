import { z } from "zod";

export const verifyUserSchema = z.object({
  verifyToken: z
    .string({
      required_error: "Name is required",
    })
    .min(5, { message: "Token is invalid" }),
});

export type VerifyUserTokenPayload = z.infer<typeof verifyUserSchema>
