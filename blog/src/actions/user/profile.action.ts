"use server";

import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

import prisma from "@/lib/database/database";
import { logger } from "@/lib/logger/logger";
import { comparePassword, hashPassword } from "@/lib/utils/password";

import { auth } from "./helpers/auth";

export const getUserProfile = async (
  userId: string,
): Promise<Omit<User, "password" | "createdAt"> | undefined> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        imageUrl: true,
      },
    });

    if (!user) {
      return;
    }

    return user;
  } catch (err) {
    const error = err as Error;
    logger.error(error.message);
  }
};

export const updateAvatar = async (imageUrl?: string): Promise<void> => {
  const session = await auth();

  if (!session) {
    throw new Error("Not authorized");
  }

  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        imageUrl: {
          ...(imageUrl ? { set: imageUrl } : { unset: true }),
        },
      },
    });

    // TODO: Check if it's needed
    revalidatePath("/auth");
  } catch (err) {
    const error = err as Error;
    logger.error(error.message);
  }
};

type UpdatePasswordRequest = {
  id: string;
  oldPassword: string;
  newPassword: string;
};

export const updatePassword = async ({
  id,
  oldPassword,
  newPassword,
}: UpdatePasswordRequest) => {
  const session = await auth();

  if (!session) {
    throw new Error("Not authorized");
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordCorrect = comparePassword(oldPassword, user.password);

    if (!isPasswordCorrect) {
      throw new Error("Password is incorrect");
    }

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        password: hashPassword(newPassword),
      },
    });
  } catch (err) {
    const error = err as Error;
    logger.error(error.message);

    throw error;
  }
};
