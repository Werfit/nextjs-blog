"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/database/database";
import { logger } from "@/lib/logger/logger";

import { auth } from "./helpers/auth";

export const updateAvatar = async (imageUrl?: string): Promise<void> => {
  const session = await auth();

  if (!session) {
    throw new Error("Not authorized");
  }

  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        imageUrl: {
          ...(imageUrl ? { set: imageUrl } : { unset: true }),
        },
      },
    });

    // TODO: Check if it's needed
    revalidatePath("/auth");
  } catch (err) {
    const error = err as Error;
    logger.error(error.message);
  }
};
