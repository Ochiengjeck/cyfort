"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { homeHeroSchema } from "@/lib/validation/homeHero";

export async function updateHomeHeroAction(formData: FormData) {
  const data = homeHeroSchema.parse({
    eyebrow: formData.get("eyebrow"),
    headlineLead: formData.get("headlineLead"),
    headlineEmphasis: formData.get("headlineEmphasis"),
    primaryCtaLabel: formData.get("primaryCtaLabel"),
    primaryCtaHref: formData.get("primaryCtaHref"),
    secondaryCtaLabel: formData.get("secondaryCtaLabel"),
    secondaryCtaHref: formData.get("secondaryCtaHref"),
  });

  const existing = await prisma.homeHero.findFirst();
  if (existing) {
    await prisma.homeHero.update({ where: { id: existing.id }, data });
  } else {
    await prisma.homeHero.create({ data });
  }

  revalidatePath("/admin/home");
  revalidatePath("/");
}
