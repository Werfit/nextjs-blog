"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/database/database";
import { logger } from "@/lib/logger/logger";

import { auth } from "../helpers/auth";
import { replaceCountWithIsFollowed } from "../user.helper";
import {
  getSubscriptionCondition,
  getUserIdCondition,
} from "./followers.helper";
import {
  GetSearchUsersResponse,
  UserWithSubscribersCountResponse,
} from "./followers.types";

export const follow = async (data: FormData): Promise<void> => {
  const session = await auth();

  if (!session) {
    throw new Error("Not authenticated");
  }

  const userId = data.get("userId");

  if (!userId) {
    throw new Error("User was not found");
  }

  try {
    await prisma.follower.create({
      data: {
        // TODO: logically, subscriber should be session.user.id and following = userId, but prisma connects them the other way around
        subscriberId: userId.toString(),
        followingId: session.user.id,
      },
    });

    revalidatePath("(blog)/(users)/search");
  } catch (err) {
    const error = err as Error;
    logger.error(error.message, error);
  }
};

export const unFollow = async (data: FormData): Promise<void> => {
  const session = await auth();

  if (!session) {
    throw new Error("Not authenticated");
  }

  const userId = data.get("userId");

  if (!userId) {
    throw new Error("User not found");
  }

  try {
    await prisma.follower.deleteMany({
      where: {
        subscriberId: userId.toString(),
        followingId: session.user.id,
      },
    });

    revalidatePath("(blog)/(users)/search");
  } catch (err) {
    const error = err as Error;
    logger.error(error.message, error);
  }
};

export const getUsers = async (
  username: string,
): Promise<GetSearchUsersResponse> => {
  const session = await auth();

  const userIdCondition = getUserIdCondition(session);
  const subscriptionCondition = getSubscriptionCondition(session);

  try {
    const users = await prisma.user.findMany({
      where: {
        ...userIdCondition,
        username: {
          contains: username,
          mode: "insensitive",
        },
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

    if (session) {
      const formattedUsers = users.map((user) =>
        replaceCountWithIsFollowed(user as UserWithSubscribersCountResponse),
      );

      return formattedUsers;
    }

    return users;
  } catch (err) {
    const error = err as Error;
    logger.error(error.message, error);
    return [];
  }
};
