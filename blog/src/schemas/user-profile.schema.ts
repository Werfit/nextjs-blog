import { z } from "zod";

import { PASSWORD_MIN_LENGTH } from "./constants";

const USERNAME_MIN_LENGTH = 4;

// TODO: Combine common properties with registrationSchema
export const userProfileSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username must be a string",
    })
    .min(USERNAME_MIN_LENGTH, {
      message: `Username should be at least ${USERNAME_MIN_LENGTH} characters long`,
    }),
  firstName: z
    .string({
      invalid_type_error: "First name must be a string",
    })
    .optional(),
  lastName: z
    .string({
      invalid_type_error: "Last name must be a string",
    })
    .optional(),
});

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string({
      required_error: "Enter your current password",
    }),
    newPassword: z
      .string({
        required_error: "Enter your new password",
      })
      .min(PASSWORD_MIN_LENGTH, {
        message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`,
      }),
    newPasswordConfirmation: z.string({
      required_error: "Enter your current password",
    }),
  })
  .refine(
    ({ newPasswordConfirmation, newPassword }) =>
      newPasswordConfirmation === newPassword,
    {
      message: "Passwords don't match",
      path: ["newPasswordConfirmation"],
    },
  );

export type UserProfileSchema = z.infer<typeof userProfileSchema>;
export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;
