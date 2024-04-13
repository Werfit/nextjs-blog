import prisma from "@/lib/database/database";

export const isInFavorite = async (
  articleId: string,
  userId: string,
): Promise<boolean> => {
  const count = await prisma.favorite.count({
    where: {
      articleId,
      userId,
    },
  });

  return count > 0;
};

export const createFavorite = async (
  articleId: string,
  userId: string,
): Promise<void> => {
  await prisma.favorite.create({
    data: {
      articleId,
      userId,
    },
  });
};

export const removeFavorite = async (
  articleId: string,
  userId: string,
): Promise<void> => {
  await prisma.favorite.deleteMany({
    where: {
      articleId,
      userId,
    },
  });
};
