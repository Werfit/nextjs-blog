"use server";

import { client } from "@/lib/database/supabase";
import { auth } from "../user/helpers/auth";
import { sanitizeHtml } from "@/lib/sanitizer/sanitize-html";
import { createArticleSchema } from "@/schemas/article.schema";
import { Tables } from "@/lib/database/database.types";
import { logger } from "@/lib/logger/logger";

export type ArticleResponse = Omit<
  Tables<"articles">,
  "updated_at" | "owner"
> & {
  owner: Pick<Tables<"users">, "id" | "username">;
};

export const getArticles = async (
  limit = 5,
  page = 0
): Promise<{ data: ArticleResponse[]; count: number }> => {
  const { error, data, count } = await client
    .from("articles")
    .select(
      `
      id,
      featured_image_url,
      title,
      content_html,
      content,
      created_at,
      owner (id, username)`,
      { count: "exact" }
    )
    .range(page * limit, (page + 1) * limit)
    .returns<ArticleResponse[]>();

  if (error || typeof count !== "number") {
    logger.error(error?.message ?? "Count is not a number", error);
    return { data: [], count: 0 };
  }

  return { data: data, count };
};

export const getArticleById = async (
  id: Tables<"articles">["id"]
): Promise<{ data: ArticleResponse | null }> => {
  try {
    const { error, data } = await client
      .from("articles")
      .select(
        `
        id,
        featured_image_url,
        title,
        content_html,
        content,
        created_at,
        owner (id, username)`
      )
      .eq("id", id)
      .returns<ArticleResponse>()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error("Article not found");
    }

    return { data };
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
    const result = await client.from("articles").insert([
      {
        featured_image_url: featuredImage,
        title,
        content_html: sanitizeHtml(parsedValues.contentHtml),
        content,
        owner: userId,
      },
    ]);

    if (result.error) {
      throw new Error(result.error.message);
    }
  } catch (err) {
    const error = err as Error;
    logger.error(error.message, error);
  }
};
