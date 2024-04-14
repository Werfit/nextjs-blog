import { Article, User } from "@prisma/client";
import { NextRequest } from "next/server";

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

export const GET = async (request: NextRequest) => {
  const MAX_ARTICLES_RESPONSE = 5;
  const title = request.nextUrl.searchParams.get("title");

  if (!title) {
    return Response.json({ articles: [] }, { status: HttpStatus.OK });
  }

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

    return Response.json({ articles }, { status: HttpStatus.OK });
  } catch (err) {
    const error = err as Error;
    logger.error(error.message);
    return Response.json(
      { message: error.message },
      { status: HttpStatus.INTERNAL },
    );
  }
};
