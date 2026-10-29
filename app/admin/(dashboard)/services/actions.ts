"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { serviceSchema } from "@/lib/validation/service";
import { parseRepeatableField } from "@/lib/validation/formData";
import { slugify } from "@/lib/slugify";

function parse(formData: FormData) {
  const name = String(formData.get("name") ?? "");
  const rawSlug = String(formData.get("slug") ?? "");

  return serviceSchema.parse({
    name,
    slug: slugify(rawSlug || name),
    summary: formData.get("summary"),
    icon: formData.get("icon") || undefined,
    approach: formData.get("approach") || undefined,
    outcomes: formData.get("outcomes") || undefined,
    items: parseRepeatableField(formData, "items"),
    pillar: formData.get("pillar") || undefined,
    featured: formData.get("featured") === "on",
    ctaLabel: formData.get("ctaLabel") || undefined,
    ctaHref: formData.get("ctaHref") || undefined,
    builtForTags: formData.get("builtForTags") || undefined,
    triggerText: formData.get("triggerText") || undefined,
  });
}

function refresh(slug?: string) {
  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
  if (slug) revalidatePath(`/services/${slug}`);
}

export async function createServiceAction(formData: FormData) {
  const { items, ...data } = parse(formData);
  const count = await prisma.service.count();

  await prisma.service.create({
    data: {
      ...data,
      order: count,
      items: { create: items.map((label, index) => ({ label, order: index })) },
    },
  });

  refresh(data.slug);
  redirect("/admin/services");
}

export async function updateServiceAction(id: string, formData: FormData) {
  const { items, ...data } = parse(formData);

  await prisma.service.update({
    where: { id },
    data: {
      ...data,
      items: {
        deleteMany: {},
        create: items.map((label, index) => ({ label, order: index })),
      },
    },
  });

  refresh(data.slug);
  redirect("/admin/services");
}

export async function deleteServiceAction(id: string) {
  await prisma.service.delete({ where: { id } });
  refresh();
}

export async function reorderServicesAction(formData: FormData) {
  const updates: Array<Promise<unknown>> = [];
  for (const [key, value] of formData.entries()) {
    if (!key.startsWith("order-")) continue;
    const id = key.slice("order-".length);
    const order = Number(value);
    if (Number.isFinite(order)) {
      updates.push(prisma.service.update({ where: { id }, data: { order } }));
    }
  }
  await Promise.all(updates);
  refresh();
}
