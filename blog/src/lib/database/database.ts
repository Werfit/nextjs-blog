import { PrismaClient } from "@prisma/client";

import { env } from "@/env/env";

const prismaClientSingleton = () => {
  return new PrismaClient({
    datasources: {
      db: {
        url: env.database.url,
      },
    },
  });
};

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
