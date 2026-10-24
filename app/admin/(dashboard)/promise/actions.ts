"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { promiseItemSchema } from "@/lib/validation/promiseItem";

function parse(formData: FormData) {
  return promiseItemSchema.parse({
    title: formData.get("title"),
    body: formData.get("body"),
  });
}

function refresh() {
  revalidatePath("/admin/promise");
  revalidatePath("/");
}

export async function createPromiseItemAction(formData: FormData) {
  const data = parse(formData);
  const count = await prisma.promiseItem.count();
  await prisma.promiseItem.create({ data: { ...data, order: count } });
  refresh();
  redirect("/admin/promise");
}

export async function updatePromiseItemAction(id: string, formData: FormData) {
  const data = parse(formData);
  await prisma.promiseItem.update({ where: { id }, data });
  refresh();
  redirect("/admin/promise");
}

export async function deletePromiseItemAction(id: string) {
  await prisma.promiseItem.delete({ where: { id } });
  refresh();
}

export async function reorderPromiseItemsAction(formData: FormData) {
  const updates: Array<Promise<unknown>> = [];
  for (const [key, value] of formData.entries()) {
    if (!key.startsWith("order-")) continue;
    const id = key.slice("order-".length);
    const order = Number(value);
    if (Number.isFinite(order)) {
      updates.push(prisma.promiseItem.update({ where: { id }, data: { order } }));
    }
  }
  await Promise.all(updates);
  refresh();
}
