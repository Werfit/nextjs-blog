import joi from "joi";

const USERNAME_MIN_LENGTH = 4;
const PASSWORD_MIN_LENGTH = 8;

// TODO: Combine common properties with loginSchema
export const registrationSchema = joi.object({
  username: joi
    .string()
    .required()
    .min(USERNAME_MIN_LENGTH)
    .messages({
      "string.min": `Username should be at least ${USERNAME_MIN_LENGTH} characters long`,
    }),
  password: joi
    .string()
    .required()
    .min(PASSWORD_MIN_LENGTH)
    .messages({
      "string.min": `Password should be at least ${PASSWORD_MIN_LENGTH} characters long`,
    }),
  confirmPassword: joi.string().equal(joi.ref("password")).messages({
    "any.only": "Passwords must match",
  }),
});

export type RegistrationSchema = {
  username: string;
  password: string;
  confirmPassword: string;
};
