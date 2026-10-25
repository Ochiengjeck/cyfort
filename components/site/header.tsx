import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { HeaderShell } from "./header-shell";

export async function Header() {
  // Required under Cache Components: we always want live, per-request nav
  // data (site name, nav links), so this ties rendering to a real request
  // rather than letting it get baked into the static shell.
  await connection();

  const [settings, navLinks] = await Promise.all([
    prisma.siteSettings.findFirst(),
    prisma.navLink.findMany({ orderBy: { order: "asc" } }),
  ]);

  return <HeaderShell siteName={settings?.siteName ?? "CyFort Technologies Limited"} navLinks={navLinks} />;
}
