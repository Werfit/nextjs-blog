"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

import { UserResponse } from "@/actions/common.types";
import prisma from "@/lib/database/database";
import { logger } from "@/lib/logger/logger";
import { comparePassword, hashPassword } from "@/lib/utils/password";

import { getSubscriptionCondition } from "../followers/followers.helper";
import { UserWithCurrentUserSubscriber } from "../followers/followers.types";
import { auth } from "../helpers/auth";
import { replaceCountWithIsFollowed } from "../user.helper";
import { UpdatePasswordRequest } from "./profile.types";

export const getUserProfile = async (
  userId: string,
): Promise<UserResponse | UserWithCurrentUserSubscriber | null> => {
  const session = await auth();

  const subscriptionCondition: Prisma.UserSelect =
    getSubscriptionCondition(session);

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
        ...subscriptionCondition,
      },
    });

    if (!user) {
      notFound();
    }

    if (session) {
      return replaceCountWithIsFollowed(user);
    }

    return user;
  } catch (err) {
    const error = err as Error;
    logger.error(error.message);

    return null;
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
