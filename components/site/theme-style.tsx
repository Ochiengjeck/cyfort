import { connection } from "next/server";
import { prisma } from "@/lib/prisma";

const HEX_PATTERN = /^#[0-9a-fA-F]{6}$/;

function safe(value: string | undefined, fallback: string): string {
  return value && HEX_PATTERN.test(value) ? value : fallback;
}

/**
 * Server-rendered style override for the brand color tokens, sourced from
 * the live SiteSettings row. Because the root layout opts out of Cache
 * Components caching (`instant = false`), this read happens on every
 * request, so an admin's theme change is reflected on the very next page
 * load with no revalidation step required.
 */
export async function ThemeStyle() {
  await connection();
  const settings = await prisma.siteSettings.findFirst();

  const vars = {
    "--color-brand-dark": safe(settings?.colorDark, "#0A0A0B"),
    "--color-brand-ink": safe(settings?.colorInk, "#141414"),
    "--color-brand-gold": safe(settings?.colorGold, "#C9A227"),
    "--color-brand-gold-dark": safe(settings?.colorGoldDark, "#9C7A3C"),
    "--color-brand-gold-light": safe(settings?.colorGoldLight, "#E8CE8F"),
    "--color-brand-paper": safe(settings?.colorPaper, "#141414"),
    "--color-brand-paper-alt": safe(settings?.colorPaperAlt, "#0A0A0B"),
    "--color-brand-muted": safe(settings?.colorMuted, "#9CA3AF"),
  };

  const css = `:root{${Object.entries(vars)
    .map(([key, value]) => `${key}:${value};`)
    .join("")}}`;

  return <style id="brand-theme-vars" dangerouslySetInnerHTML={{ __html: css }} />;
}
