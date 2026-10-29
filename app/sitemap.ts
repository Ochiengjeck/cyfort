import type { MetadataRoute } from "next";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { SITE_URL } from "@/lib/metadata";

const STATIC_ROUTES = ["/", "/about", "/services", "/industries", "/blog", "/contact", "/terms", "/privacy"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();

  const [services, insights] = await Promise.all([
    prisma.service.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.insightPost.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
  ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const serviceEntries: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified: service.updatedAt,
  }));

  const insightEntries: MetadataRoute.Sitemap = insights.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt,
  }));

  return [...staticEntries, ...serviceEntries, ...insightEntries];
}
