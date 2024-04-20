import { Prisma, User } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { HttpStatus } from "@/enums/http-status.enum";
import prisma from "@/lib/database/database";
import { HttpError } from "@/lib/error/http-error";
import { comparePassword, hashPassword } from "@/lib/utils/password";

export const loginUser = async (
  username: string,
  password: string,
): Promise<Omit<User, "password">> => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    throw new HttpError("Incorrect credentials", HttpStatus.NOT_FOUND);
  }

  if (!comparePassword(password, user.password)) {
    throw new HttpError("Incorrect credentials", HttpStatus.NOT_FOUND);
  }

  const { password: _, ...foundUser } = user;
  revalidatePath("/", "layout");
  return foundUser;
};

export const createUser = async (
  username: string,
  password: string,
): Promise<Omit<User, "password">> => {
  const targetUser = await prisma.user.count({
    where: {
      username,
    },
  });

  if (targetUser > 0) {
    throw new HttpError(
      "User with this username already exists",
      HttpStatus.FORBIDDEN,
    );
  }

  try {
    const userInput: Prisma.UserCreateInput = {
      username,
      password: hashPassword(password),
    };
    const user = await prisma.user.create({
      data: userInput,
    });
    revalidatePath("/");
    return user;
  } catch (err) {
    const error = err as Error;
    throw new Error(error.message);
  }
};
