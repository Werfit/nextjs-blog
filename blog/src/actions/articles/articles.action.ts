"use server";

import { Article, Prisma, User } from "@prisma/client";
import { revalidatePath } from "next/cache";

import prisma from "@/lib/database/database";
import { logger } from "@/lib/logger/logger";
import { sanitizeHtml } from "@/lib/sanitizer/sanitize-html";
import { createArticleSchema } from "@/schemas/article.schema";

import { auth } from "../user/helpers/auth";

type PaginationResponse = {
  metadata: { total: number; page: number; limit: number };
};

export type ArticleWithOwner = Article & {
  owner: Pick<User, "id" | "username">;
};

export const getUserArticles = async (
  id: string,
  limit = 5,
  page = 0,
): Promise<{ data: ArticleWithOwner[] } & PaginationResponse> => {
  try {
    const data = await prisma.article.findMany({
      skip: page * limit,
      take: limit,
      where: {
        ownerId: id,
      },
      include: {
        owner: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const total = await prisma.article.count({
      where: {
        ownerId: id,
      },
    });
    return { data: data, metadata: { total, page, limit } };
  } catch (err) {
    const error = err as Error;
    logger.error(error.message);
    return { data: [], metadata: { total: 0, page, limit } };
  }
};

export const getArticles = async (
  limit = 5,
  page = 0,
): Promise<
  {
    data: ArticleWithOwner[];
  } & PaginationResponse
> => {
  const session = await auth();

  const followingUsersCondition:
    | Prisma.ArticleFindManyArgs
    | Prisma.ArticleCountArgs = session
    ? {
        where: {
          owner: {
            subscribers: {
              some: {
                followingId: session?.user.id,
              },
            },
          },
        },
      }
    : {};

  try {
    const data = await prisma.article.findMany({
      skip: page * limit,
      take: limit,
      // if user is authorized, search only for followed author articles
      ...(followingUsersCondition as Prisma.ArticleFindManyArgs),
      include: {
        owner: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const total = await prisma.article.count({
      ...(followingUsersCondition as Prisma.ArticleCountArgs),
    });
    return { data: data, metadata: { total, page, limit } };
  } catch (err) {
    const error = err as Error;
    logger.error(error.message);
    return { data: [], metadata: { total: 0, page, limit } };
  }
};

type GetArticleIdResponse = Article & {
  isFavorite?: boolean;
  owner: Pick<User, "id" | "username">;
};

export const getArticleById = async (
  id: Article["id"],
): Promise<{
  data: GetArticleIdResponse | null;
}> => {
  const session = await auth();

  try {
    const article = await prisma.article.findUnique({
      where: {
        id,
      },
      include: {
        owner: {
          select: {
            id: true,
            username: true,
          },
        },
        // if user is authenticated, add field for indicating if it's in favorites
        ...(session
          ? {
              inFavorites: {
                where: {
                  userId: session?.user.id,
                },
                select: {
                  id: true,
                },
              },
            }
          : {}),
      },
    });

    if (!article) {
      throw new Error("Article not found");
    }

    if (article.inFavorites) {
      const { inFavorites, ...data } = article;
      return { data: { ...data, isFavorite: inFavorites.length > 0 } };
    }
    return {
      data: article,
    };
  } catch (err) {
    const error = err as Error;
    logger.error(error.message, error);

    return { data: null };
  }
};

export const createArticle = async (data: FormData): Promise<void> => {
  const session = await auth();

  if (!session) {
    throw new Error("Not authenticated");
  }

  const featuredImage = data.get("featuredImage");
  const title = data.get("title");
  const content = data.get("content");
  const contentHtml = data.get("contentHtml");
  const userId = session.user.id;

  const parsedValues = createArticleSchema.parse({
    featuredImage,
    title,
    contentHtml,
    content,
  });

  try {
    await prisma.article.create({
      data: {
        featuredImageUrl: parsedValues.featuredImage,
        title: parsedValues.title,
        contentHtml: sanitizeHtml(parsedValues.contentHtml),
        content: parsedValues.content,
        ownerId: userId,
      },
    });

    revalidatePath("/", "page");
  } catch (err) {
    const error = err as Error;
    logger.error(error.message, error);
  }
};
