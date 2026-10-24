"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { differentiatorSchema } from "@/lib/validation/differentiator";

function parse(formData: FormData) {
  return differentiatorSchema.parse({
    title: formData.get("title"),
    body: formData.get("body"),
  });
}

function refresh() {
  revalidatePath("/admin/differentiators");
  revalidatePath("/about");
  revalidatePath("/");
}

export async function createDifferentiatorAction(formData: FormData) {
  const data = parse(formData);
  const count = await prisma.differentiator.count();
  await prisma.differentiator.create({ data: { ...data, order: count } });
  refresh();
  redirect("/admin/differentiators");
}

export async function updateDifferentiatorAction(id: string, formData: FormData) {
  const data = parse(formData);
  await prisma.differentiator.update({ where: { id }, data });
  refresh();
  redirect("/admin/differentiators");
}

export async function deleteDifferentiatorAction(id: string) {
  await prisma.differentiator.delete({ where: { id } });
  refresh();
}

export async function reorderDifferentiatorsAction(formData: FormData) {
  const updates: Array<Promise<unknown>> = [];
  for (const [key, value] of formData.entries()) {
    if (!key.startsWith("order-")) continue;
    const id = key.slice("order-".length);
    const order = Number(value);
    if (Number.isFinite(order)) {
      updates.push(prisma.differentiator.update({ where: { id }, data: { order } }));
    }
  }
  await Promise.all(updates);
  refresh();
}
