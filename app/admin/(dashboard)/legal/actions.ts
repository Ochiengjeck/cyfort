"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { legalPageSchema } from "@/lib/validation/legalPage";

function parse(formData: FormData) {
  return legalPageSchema.parse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    body: formData.get("body"),
  });
}

function refresh(slug?: string) {
  revalidatePath("/admin/legal");
  if (slug) revalidatePath(`/${slug}`);
}

export async function createLegalPageAction(formData: FormData) {
  const data = parse(formData);
  await prisma.legalPage.create({ data });
  refresh(data.slug);
  redirect("/admin/legal");
}

export async function updateLegalPageAction(id: string, formData: FormData) {
  const data = parse(formData);
  await prisma.legalPage.update({ where: { id }, data });
  refresh(data.slug);
  redirect("/admin/legal");
}

export async function deleteLegalPageAction(id: string) {
  await prisma.legalPage.delete({ where: { id } });
  refresh();
}
