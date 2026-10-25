import "dotenv/config";
import { defineConfig } from "prisma/config";

// CLI/migration commands prefer a direct (non-pooled) connection when one is
// configured; the app itself always uses DATABASE_URL (see lib/prisma.ts).
const url =
  process.env.DIRECT_URL ??
  process.env.DATABASE_URL ??
  process.env.PRISMA_DATABASE_URL ??
  process.env.POSTGRES_URL ??
  "";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "npx tsx prisma/seed.ts",
  },
  datasource: {
    url,
  },
});
