import type { MetadataRoute } from "next";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { SITE_URL } from "@/lib/metadata";

const STATIC_ROUTES = [
  "/",
  "/about",
  "/services",
  "/industries",
  "/team",
  "/case-studies",
  "/insights",
  "/careers",
  "/contact",
  "/terms",
  "/privacy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();

  const [services, caseStudies, insights, jobs] = await Promise.all([
    prisma.service.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.caseStudy.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
    prisma.insightPost.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
    prisma.jobPosting.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
  ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const serviceEntries: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified: service.updatedAt,
  }));

  const caseStudyEntries: MetadataRoute.Sitemap = caseStudies.map((item) => ({
    url: `${SITE_URL}/case-studies/${item.slug}`,
    lastModified: item.updatedAt,
  }));

  const insightEntries: MetadataRoute.Sitemap = insights.map((post) => ({
    url: `${SITE_URL}/insights/${post.slug}`,
    lastModified: post.updatedAt,
  }));

  const jobEntries: MetadataRoute.Sitemap = jobs.map((job) => ({
    url: `${SITE_URL}/careers/${job.slug}`,
    lastModified: job.updatedAt,
  }));

  return [...staticEntries, ...serviceEntries, ...caseStudyEntries, ...insightEntries, ...jobEntries];
}
