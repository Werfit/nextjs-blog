import { client } from "@/lib/database/supabase";

export const isInFavorite = async (
  articleId: string,
  userId: string,
): Promise<boolean> => {
  const { count, error } = await client
    .from("favorites")
    .select("id", { count: "exact" })
    .eq("article", articleId)
    .eq("user", userId);

  if (error) {
    throw new Error(error.message);
  }

  return typeof count === "number" && count > 0;
};

export const createFavorite = async (
  articleId: string,
  userId: string,
): Promise<void> => {
  const { error } = await client.from("favorites").insert({
    article: articleId,
    user: userId,
  });

  if (error) {
    throw new Error(error.message);
  }
};

export const removeFavorite = async (
  articleId: string,
  userId: string,
): Promise<void> => {
  const { error } = await client
    .from("favorites")
    .delete()
    .eq("article", articleId)
    .eq("user", userId);

  if (error) {
    throw new Error(error.message);
  }
};
