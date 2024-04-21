import { Article, User } from "@prisma/client";

export type PaginationResponse = {
  total: number;
  page: number;
  limit: number;
};

export type ArticleWithOwner = Article & {
  owner: Pick<User, "id" | "username">;
};

export type GetArticlesResponse = {
  data: ArticleWithOwner[];
  metadata: PaginationResponse;
};
