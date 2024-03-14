import { client } from "@/lib/database/supabase";
import { comparePassword, hashPassword } from "@/lib/utils/password";
import { Tables } from "@/lib/database/database.types";
import { convertSnakeCaseToCamelCase } from "@/lib/utils/snake-case-to-camel-case";
import { HttpError } from "@/lib/error/http-error";
import { HttpStatus } from "@/enums/http-status.enum";

type OriginalUser = Tables<"users">;

type User<T extends OriginalUser> = {
  [k in keyof T]: T[k];
};

type UserWithoutPassword = Omit<User<OriginalUser>, "password">;

export const loginUser = async (
  username: string,
  password: string
): Promise<UserWithoutPassword> => {
  const { data: user } = await client
    .from("users")
    .select("*")
    .eq("username", username)
    .single();

  if (!user) {
    throw new HttpError("Incorrect credentials", HttpStatus.NOT_FOUND);
  }

  if (!comparePassword(password, user.password)) {
    throw new HttpError("Incorrect credentials", HttpStatus.NOT_FOUND);
  }

  const { password: _, ...foundUser } = user;
  return convertSnakeCaseToCamelCase(foundUser);
};

export const createUser = async (
  username: string,
  password: string
): Promise<UserWithoutPassword> => {
  const { data: targetUser } = await client
    .from("users")
    .select("id")
    .eq("username", username)
    .single();

  if (targetUser) {
    throw new HttpError(
      "User with this username already exists",
      HttpStatus.FORBIDDEN
    );
  }

  const { data: user, error } = await client
    .from("users")
    .insert({ username, password: hashPassword(password) })
    .select("id, username, created_at, first_name, last_name")
    .single();

  if (!user) {
    throw new Error(error?.message);
  }

  return convertSnakeCaseToCamelCase(user);
};
