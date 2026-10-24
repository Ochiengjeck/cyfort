"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { caseStudySchema } from "@/lib/validation/caseStudy";
import { slugify } from "@/lib/slugify";

function parse(formData: FormData) {
  const title = String(formData.get("title") ?? "");
  const rawSlug = String(formData.get("slug") ?? "");

  return caseStudySchema.parse({
    title,
    slug: slugify(rawSlug || title),
    clientName: formData.get("clientName"),
    industryTag: formData.get("industryTag") || undefined,
    summary: formData.get("summary"),
    body: formData.get("body"),
    coverMediaId: formData.get("coverMediaId") || undefined,
    published: formData.get("published") === "on",
  });
}

function refresh(slug?: string) {
  revalidatePath("/admin/case-studies");
  revalidatePath("/case-studies");
  if (slug) revalidatePath(`/case-studies/${slug}`);
}

export async function createCaseStudyAction(formData: FormData) {
  const data = parse(formData);
  await prisma.caseStudy.create({
    data: { ...data, publishedAt: data.published ? new Date() : null },
  });
  refresh(data.slug);
  redirect("/admin/case-studies");
}

export async function updateCaseStudyAction(id: string, formData: FormData) {
  const data = parse(formData);
  const existing = await prisma.caseStudy.findUnique({ where: { id } });

  await prisma.caseStudy.update({
    where: { id },
    data: {
      ...data,
      publishedAt: data.published ? (existing?.publishedAt ?? new Date()) : null,
    },
  });

  refresh(data.slug);
  redirect("/admin/case-studies");
}

export async function deleteCaseStudyAction(id: string) {
  await prisma.caseStudy.delete({ where: { id } });
  refresh();
}
