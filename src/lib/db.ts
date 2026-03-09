import { PrismaClient } from "@prisma/client";

/**
 * Prisma Client instance
 * Singleton pattern to prevent multiple instances in development
 * Uses environment variable for database URL
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const createPrismaClient = () => {
  return new PrismaClient();
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
