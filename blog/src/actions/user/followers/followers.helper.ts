import { Prisma } from "@prisma/client";
import { Session } from "next-auth";

import { getAuthDependentCondition } from "@/helpers/get-auth-dependent-condition.helper";

export const getUserIdCondition = (session: Session | null) =>
  getAuthDependentCondition<Prisma.UserWhereInput>(
    {
      id: {
        not: session?.user.id,
      },
    },
    session,
  );

export const getSubscriptionCondition = (session: Session | null) =>
  getAuthDependentCondition<Prisma.UserSelect>(
    {
      _count: {
        select: {
          subscribers: {
            where: {
              followingId: session?.user.id,
            },
          },
        },
      },
    },
    session,
  );
