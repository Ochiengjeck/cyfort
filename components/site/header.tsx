import { cookies } from "next/headers";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { THEME_COOKIE_NAME, parseTheme } from "@/lib/theme/constants";
import { HeaderShell } from "./header-shell";

export async function Header() {
  // Required under Cache Components: we always want live, per-request nav
  // data (site name, nav links), so this ties rendering to a real request
  // rather than letting it get baked into the static shell.
  await connection();

  const [settings, navLinks, servicesMenu, themeCookie] = await Promise.all([
    prisma.siteSettings.findFirst(),
    prisma.navLink.findMany({ orderBy: { order: "asc" } }),
    prisma.service.findMany({
      where: { featured: true },
      orderBy: { order: "asc" },
      select: { id: true, slug: true, name: true },
    }),
    cookies(),
  ]);

  return (
    <HeaderShell
      siteName={settings?.siteName ?? "CyFort Technologies Limited"}
      navLinks={navLinks}
      servicesMenu={servicesMenu}
      theme={parseTheme(themeCookie.get(THEME_COOKIE_NAME)?.value)}
    />
  );
}
