import bcryptjs from "bcryptjs";

const SALT_ROUNDS = 10;

export const hashPassword = (password: string): string => {
  return bcryptjs.hashSync(password, SALT_ROUNDS);
};

export const comparePassword = (
  password: string,
  hashedPassword: string,
): boolean => {
  return bcryptjs.compareSync(password, hashedPassword);
};
