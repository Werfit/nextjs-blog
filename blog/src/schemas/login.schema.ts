import { z } from "zod";

const USERNAME_MIN_LENGTH = 4;
const PASSWORD_MIN_LENGTH = 8;

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
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password is incorrect",
    })
    .min(PASSWORD_MIN_LENGTH, {
      message: `Password should be at least ${PASSWORD_MIN_LENGTH} characters long`,
    }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
