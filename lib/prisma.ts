import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// SQLite now (local file, via the better-sqlite3 driver adapter required by
// Prisma 7+). Moving to Postgres later means swapping this adapter for
// @prisma/adapter-pg and updating `datasource.provider` in schema.prisma —
// the rest of the data layer (models, queries) is unaffected.
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! }),
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
