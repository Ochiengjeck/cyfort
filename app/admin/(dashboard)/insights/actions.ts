"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { insightPostSchema } from "@/lib/validation/insightPost";
import { slugify } from "@/lib/slugify";

function parse(formData: FormData) {
  const title = String(formData.get("title") ?? "");
  const rawSlug = String(formData.get("slug") ?? "");

  return insightPostSchema.parse({
    title,
    slug: slugify(rawSlug || title),
    excerpt: formData.get("excerpt"),
    body: formData.get("body"),
    coverMediaId: formData.get("coverMediaId") || undefined,
    authorName: formData.get("authorName") || undefined,
    authorRole: formData.get("authorRole") || undefined,
    category: formData.get("category") || undefined,
    tags: formData.get("tags") || undefined,
    published: formData.get("published") === "on",
  });
}

function refresh(slug?: string) {
  revalidatePath("/admin/insights");
  revalidatePath("/insights");
  if (slug) revalidatePath(`/insights/${slug}`);
}

export async function createInsightPostAction(formData: FormData) {
  const data = parse(formData);
  await prisma.insightPost.create({
    data: { ...data, publishedAt: data.published ? new Date() : null },
  });
  refresh(data.slug);
  redirect("/admin/insights");
}

export async function updateInsightPostAction(id: string, formData: FormData) {
  const data = parse(formData);
  const existing = await prisma.insightPost.findUnique({ where: { id } });

  await prisma.insightPost.update({
    where: { id },
    data: {
      ...data,
      publishedAt: data.published ? (existing?.publishedAt ?? new Date()) : null,
    },
  });

  refresh(data.slug);
  redirect("/admin/insights");
}

export async function deleteInsightPostAction(id: string) {
  await prisma.insightPost.delete({ where: { id } });
  refresh();
}
