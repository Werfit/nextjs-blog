import { Article, User } from "@prisma/client";

export type FavoriteWithOwner = Article & {
  owner: Pick<User, "id" | "username">;
};
