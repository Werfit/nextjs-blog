"use server";

import { client } from "@/lib/database/supabase";
import { Tables } from "@/lib/database/database.types";
import { auth } from "../user/helpers/auth";
import { logger } from "@/lib/logger/logger";

import { ArticleResponse } from "../articles/articles.action";
import { revalidatePath } from "next/cache";
import { createFavorite, isInFavorite, removeFavorite } from "./utils";

export const getFavorites = async (): Promise<{
  data: ArticleResponse[];
}> => {
  const session = await auth();

  if (!session) {
    throw new Error("Not authenticated");
  }

  try {
    const { data, error } = await client
      .from("favorites")
      .select(
        `
        user,
        article (*, owner (id, username))
      `,
      )
      .eq("user", session.user.id)
      .returns<Tables<"favorites"> & { article: ArticleResponse }[]>();

    if (error) {
      throw new Error(error.message);
    }

    return { data: data.map((favorite) => favorite.article) };
  } catch (err) {
    const error = err as Error;
    logger.error(error.message, error);
    return { data: [] };
  }
};

export const toggleFavorite = async (data: FormData) => {
  const session = await auth();

  if (!session) {
    throw new Error("Not authenticated");
  }

  const articleId = data.get("articleId");

  try {
    const { data: article, error } = await client
      .from("articles")
      .select("id")
      .eq("id", articleId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

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
