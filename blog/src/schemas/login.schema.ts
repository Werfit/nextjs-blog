import { z } from "zod";

import { USERNAME_MIN_LENGTH } from "./constants";

// TODO: Combine common properties with registrationSchema
export const loginSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username must be a string",
    })
    .min(USERNAME_MIN_LENGTH, {
      message: `Username should be at least ${USERNAME_MIN_LENGTH} characters long`,
    }),
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password is incorrect",
  }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
