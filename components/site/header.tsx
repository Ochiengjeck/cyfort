import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { HeaderShell } from "./header-shell";

export async function Header() {
  // Required under Cache Components: our Prisma queries run through the
  // synchronous better-sqlite3 driver, which would otherwise be eligible
  // for (and complete during) static-shell prerendering. We always want
  // live, per-request data, so this ties rendering to a real request first.
  await connection();

  const [settings, navLinks] = await Promise.all([
    prisma.siteSettings.findFirst(),
    prisma.navLink.findMany({ orderBy: { order: "asc" } }),
  ]);

  return <HeaderShell siteName={settings?.siteName ?? "CyFort Technologies Limited"} navLinks={navLinks} />;
}
