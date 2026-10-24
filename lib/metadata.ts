import type { Metadata } from "next";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";

export async function buildMetadata(params: {
  title: string;
  description?: string;
}): Promise<Metadata> {
  await connection();
  const settings = await prisma.siteSettings.findFirst();
  const description = params.description ?? settings?.metaDescription ?? settings?.tagline;

  // Just the page title — the root layout's `title.template` appends the
  // site name, so this must not duplicate it.
  return {
    title: params.title,
    description,
  };
}
