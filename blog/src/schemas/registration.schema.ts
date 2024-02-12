import { z } from "zod";

const USERNAME_MIN_LENGTH = 4;
const PASSWORD_MIN_LENGTH = 8;

// TODO: Combine common properties with loginSchema
export const registrationSchema = z
  .object({
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
    confirmPassword: z.string({
      required_error: "Passwords don't match",
    }),
  })
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegistrationSchema = z.infer<typeof registrationSchema>;
