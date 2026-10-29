"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { heroSlideSchema } from "@/lib/validation/heroSlide";

function parse(formData: FormData) {
  return heroSlideSchema.parse({
    eyebrow: formData.get("eyebrow"),
    headlineLead: formData.get("headlineLead"),
    headlineEmphasis: formData.get("headlineEmphasis"),
    description: formData.get("description"),
    primaryCtaLabel: formData.get("primaryCtaLabel"),
    primaryCtaHref: formData.get("primaryCtaHref"),
    secondaryCtaLabel: formData.get("secondaryCtaLabel"),
    secondaryCtaHref: formData.get("secondaryCtaHref"),
  });
}

function refresh() {
  revalidatePath("/admin/home");
  revalidatePath("/");
}

export async function createHeroSlideAction(formData: FormData) {
  const data = parse(formData);
  const count = await prisma.heroSlide.count();
  await prisma.heroSlide.create({ data: { ...data, order: count } });
  refresh();
  redirect("/admin/home");
}

export async function updateHeroSlideAction(id: string, formData: FormData) {
  const data = parse(formData);
  await prisma.heroSlide.update({ where: { id }, data });
  refresh();
  redirect("/admin/home");
}

export async function deleteHeroSlideAction(id: string) {
  await prisma.heroSlide.delete({ where: { id } });
  refresh();
}

export async function reorderHeroSlidesAction(formData: FormData) {
  const updates: Array<Promise<unknown>> = [];
  for (const [key, value] of formData.entries()) {
    if (!key.startsWith("order-")) continue;
    const id = key.slice("order-".length);
    const order = Number(value);
    if (Number.isFinite(order)) {
      updates.push(prisma.heroSlide.update({ where: { id }, data: { order } }));
    }
  }
  await Promise.all(updates);
  refresh();
}
