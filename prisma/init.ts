import { PrismaClient } from "@/app/generated/prisma";

const prismaClientSingleton = () => {
  return new PrismaClient({
    // Log queries only in development
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export { prisma };

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
