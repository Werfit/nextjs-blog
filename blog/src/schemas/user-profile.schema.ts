import { z } from "zod";

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

export type UserProfileSchema = z.infer<typeof userProfileSchema>;
