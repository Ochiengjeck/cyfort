import type { Metadata } from "next";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cyfort.vercel.app";
export const SITE_NAME = "CyFort Technologies Limited";
const DEFAULT_OG_IMAGE = "/images/generated/banner-shield.jpg";

export async function buildMetadata(params: {
  title: string;
  description?: string;
  image?: string | null;
  path: string;
}): Promise<Metadata> {
  await connection();
  const settings = await prisma.siteSettings.findFirst();
  const description = params.description ?? settings?.metaDescription ?? settings?.tagline;
  const ogImage = params.image ?? DEFAULT_OG_IMAGE;
  const siteName = settings?.siteName ?? SITE_NAME;
  // `<title>` relies on the root layout's `title.template` to append the
  // site name — but Open Graph/Twitter titles aren't covered by that
  // template, so they need it spelled out explicitly or social previews
  // show a bare "Home"/"About Us" with no brand context.
  const fullTitle = params.title === siteName ? siteName : `${params.title} | ${siteName}`;

  return {
    title: params.title,
    description,
    alternates: { canonical: params.path },
    openGraph: {
      title: fullTitle,
      description,
      url: params.path,
      siteName,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}
