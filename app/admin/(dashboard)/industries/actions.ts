"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { industrySchema } from "@/lib/validation/industry";

function parse(formData: FormData) {
  return industrySchema.parse({
    name: formData.get("name"),
    blurb: formData.get("blurb") || undefined,
    icon: formData.get("icon") || undefined,
    imageMediaId: formData.get("imageMediaId") || undefined,
  });
}

function refresh() {
  revalidatePath("/admin/industries");
  revalidatePath("/industries");
  revalidatePath("/");
}

export async function createIndustryAction(formData: FormData) {
  const data = parse(formData);
  const count = await prisma.industry.count();
  await prisma.industry.create({ data: { ...data, order: count } });
  refresh();
  redirect("/admin/industries");
}

export async function updateIndustryAction(id: string, formData: FormData) {
  const data = parse(formData);
  await prisma.industry.update({ where: { id }, data });
  refresh();
  redirect("/admin/industries");
}

export async function deleteIndustryAction(id: string) {
  await prisma.industry.delete({ where: { id } });
  refresh();
}

export async function reorderIndustriesAction(formData: FormData) {
  const updates: Array<Promise<unknown>> = [];
  for (const [key, value] of formData.entries()) {
    if (!key.startsWith("order-")) continue;
    const id = key.slice("order-".length);
    const order = Number(value);
    if (Number.isFinite(order)) {
      updates.push(prisma.industry.update({ where: { id }, data: { order } }));
    }
  }
  await Promise.all(updates);
  refresh();
}
