import { client } from "@/lib/database/supabase";
import { comparePassword, hashPassword } from "@/lib/utils/password";
import { Database } from "@/lib/database/database.types";
import { convertSnakeCaseToCamelCase } from "@/lib/utils/snake-case-to-camel-case";

type OriginalUser = Database["public"]["Tables"]["users"]["Row"];

type User<T extends OriginalUser> = {
  [k in keyof T]: T[k];
};

type UserWithoutPassword = Omit<User<OriginalUser>, "password">;

export const loginUser = async (
  username: string,
  password: string,
): Promise<UserWithoutPassword> => {
  const { data: user } = await client
    .from("users")
    .select("*")
    .eq("username", username)
    .single();

  if (!user) {
    throw new Error("User was not found");
  }

  if (!comparePassword(password, user.password)) {
    throw new Error("User was not found");
  }

  const { password: _, ...foundUser } = user;
  return convertSnakeCaseToCamelCase(foundUser);
};

export const createUser = async (
  username: string,
  password: string,
): Promise<UserWithoutPassword> => {
  const { data: targetUser } = await client
    .from("users")
    .select("id")
    .eq("username", username)
    .single();

  if (targetUser) {
    throw new Error("User with this username already exists");
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
