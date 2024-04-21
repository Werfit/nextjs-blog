"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

import { UserResponse } from "@/actions/common.types";
import prisma from "@/lib/database/database";
import { logger } from "@/lib/logger/logger";
import { comparePassword, hashPassword } from "@/lib/utils/password";
import { userProfileSchema } from "@/schemas/user-profile.schema";

import { getSubscriptionCondition } from "../followers/followers.helper";
import { UserWithCurrentUserSubscriber } from "../followers/followers.types";
import { auth } from "../helpers/auth";
import { replaceCountWithIsFollowed } from "../user.helper";
import { UpdatePasswordRequest, UpdateProfileRequest } from "./profile.types";

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

    notFound();
  }
};

export const updateProfile = async (user: UpdateProfileRequest) => {
  const session = await auth();

  if (!session) {
    throw new Error("Not authorized");
  }

  if (session.user.id !== user.id) {
    throw new Error("Can't update another user");
  }

  const validationResult = userProfileSchema.parse(user);
  const applyConditionally = (
    updateStatement: Prisma.UserUpdateInput,
    condition: boolean,
  ) => (condition ? updateStatement : {});

  const isUsernameUpdated = session.user.username !== validationResult.username;
  if (isUsernameUpdated) {
    if (
      await prisma.user.findUnique({
        where: { username: validationResult.username },
      })
    )
      throw new Error("User with this username already exists");
  }

  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        ...applyConditionally(
          {
            username: validationResult.username,
          },
          session.user.username !== validationResult.username,
        ),
        ...applyConditionally(
          {
            firstName: validationResult.firstName,
          },
          session.user.firstName !== validationResult.firstName,
        ),
        ...applyConditionally(
          {
            lastName: validationResult.lastName,
          },
          session.user.lastName !== validationResult.lastName,
        ),
      },
    });

    revalidatePath("/user/profile");
  } catch (err) {
    const error = err as Error;
    logger.error(error.message);

    throw new Error("Failed to update profile data");
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
    revalidatePath("/user/profile");
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
