"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/database/database";
import { logger } from "@/lib/logger/logger";

import { auth } from "../user/helpers/auth";
import {
  createFavorite,
  isInFavorite,
  removeFavorite,
} from "./favorites.helper";
import { FavoriteWithOwner } from "./favorites.types";

export const getFavorites = async (): Promise<FavoriteWithOwner[]> => {
  const session = await auth();

  if (!session) {
    throw new Error("Not authenticated");
  }

  try {
    const favorites = await prisma.favorite.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        article: {
          include: {
            owner: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
    });

    return favorites.map((favorite) => favorite.article);
  } catch (err) {
    const error = err as Error;
    logger.error(error.message, error);
    return [];
  }
};

export const toggleFavorite = async (data: FormData) => {
  const session = await auth();

  if (!session) {
    throw new Error("Not authenticated");
  }

  const articleId = data.get("articleId");

  if (!articleId) {
    return;
  }

  try {
    const article = await prisma.article.findUnique({
      select: { id: true },
      where: { id: articleId.toString() },
    });

    if (!article) {
      throw new Error("Article does not exist");
    }

    const isFavorite = await isInFavorite(article.id, session.user.id);

    if (isFavorite) {
      await removeFavorite(article.id, session.user.id);
    } else {
      await createFavorite(article.id, session.user.id);
    }

    revalidatePath("/", "page");
    return { isFavorite: !isFavorite };
  } catch (err) {
    const error = err as Error;
    logger.error(error.message, error);
  }
};
