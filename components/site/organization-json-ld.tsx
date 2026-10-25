import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { SITE_URL, SITE_NAME } from "@/lib/metadata";

/**
 * Site-wide Organization structured data (JSON-LD). Rendered once in the
 * public (site) layout — reads live SiteSettings the same way Header does.
 */
export async function OrganizationJsonLd() {
  await connection();
  const settings = await prisma.siteSettings.findFirst();

  const sameAs = [settings?.linkedinUrl, settings?.twitterUrl, settings?.facebookUrl].filter(
    (url): url is string => Boolean(url),
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings?.siteName ?? SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/brand/cyfort-logo-full.png`,
    description: settings?.tagline,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
