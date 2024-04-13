import { Article, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

import { HttpStatus } from "@/enums/http-status.enum";
import prisma from "@/lib/database/database";
import { logger } from "@/lib/logger/logger";

export type ErrorResponse = {
  message: string;
};

export type SuccessResponse = {
  articles: (Article & {
    owner: Pick<User, "id" | "username">;
  })[];
};

export const GET = async (
  request: NextApiRequest,
  response: NextApiResponse,
) => {
  const MAX_ARTICLES_RESPONSE = 5;
  const { title } = request.query as { title: string };

  try {
    const articles = await prisma.article.findMany({
      take: MAX_ARTICLES_RESPONSE,
      where: {
        title: {
          contains: title,
          mode: "insensitive",
        },
      },
      include: {
        owner: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    response.status(HttpStatus.OK).json({ articles });
    return;
  } catch (err) {
    const error = err as Error;
    logger.error(error.message);
    response.status(HttpStatus.INTERNAL).json({ message: error.message });
  }
};
