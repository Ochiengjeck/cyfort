"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { navLinkSchema } from "@/lib/validation/navLink";

function parse(formData: FormData) {
  return navLinkSchema.parse({
    label: formData.get("label"),
    href: formData.get("href"),
    openInNewTab: formData.get("openInNewTab") === "on",
  });
}

export async function createNavLinkAction(formData: FormData) {
  const data = parse(formData);
  const count = await prisma.navLink.count();
  await prisma.navLink.create({ data: { ...data, order: count } });
  revalidatePath("/admin/settings/nav");
  revalidatePath("/", "layout");
  redirect("/admin/settings/nav");
}

export async function updateNavLinkAction(id: string, formData: FormData) {
  const data = parse(formData);
  await prisma.navLink.update({ where: { id }, data });
  revalidatePath("/admin/settings/nav");
  revalidatePath("/", "layout");
  redirect("/admin/settings/nav");
}

export async function deleteNavLinkAction(id: string) {
  await prisma.navLink.delete({ where: { id } });
  revalidatePath("/admin/settings/nav");
  revalidatePath("/", "layout");
}

export async function reorderNavLinksAction(formData: FormData) {
  const updates: Array<Promise<unknown>> = [];
  for (const [key, value] of formData.entries()) {
    if (!key.startsWith("order-")) continue;
    const id = key.slice("order-".length);
    const order = Number(value);
    if (Number.isFinite(order)) {
      updates.push(prisma.navLink.update({ where: { id }, data: { order } }));
    }
  }
  await Promise.all(updates);
  revalidatePath("/admin/settings/nav");
  revalidatePath("/", "layout");
}
