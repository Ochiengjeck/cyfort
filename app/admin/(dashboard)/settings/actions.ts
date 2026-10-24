"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { generalSettingsSchema, themeSettingsSchema } from "@/lib/validation/settings";

async function getSettingsId() {
  const settings = await prisma.siteSettings.findFirst();
  if (!settings) throw new Error("SiteSettings row is missing — re-run the seed script.");
  return settings.id;
}

export async function updateGeneralSettingsAction(formData: FormData) {
  const parsed = generalSettingsSchema.parse({
    siteName: formData.get("siteName"),
    shortName: formData.get("shortName"),
    tagline: formData.get("tagline"),
    categoryLine: formData.get("categoryLine"),
    metaDescription: formData.get("metaDescription") || undefined,
    contactEmail: formData.get("contactEmail"),
    contactPhone: formData.get("contactPhone"),
    contactAddress: formData.get("contactAddress") || undefined,
    linkedinUrl: formData.get("linkedinUrl") || undefined,
    twitterUrl: formData.get("twitterUrl") || undefined,
    facebookUrl: formData.get("facebookUrl") || undefined,
    footerText: formData.get("footerText") || undefined,
  });

  const id = await getSettingsId();
  await prisma.siteSettings.update({ where: { id }, data: parsed });

  revalidatePath("/admin/settings");
  revalidatePath("/", "layout");
}

export async function updateThemeAction(formData: FormData) {
  const parsed = themeSettingsSchema.parse({
    colorDark: formData.get("colorDark"),
    colorInk: formData.get("colorInk"),
    colorGold: formData.get("colorGold"),
    colorGoldDark: formData.get("colorGoldDark"),
    colorGoldLight: formData.get("colorGoldLight"),
    colorPaper: formData.get("colorPaper"),
    colorPaperAlt: formData.get("colorPaperAlt"),
    colorMuted: formData.get("colorMuted"),
  });

  const id = await getSettingsId();
  await prisma.siteSettings.update({ where: { id }, data: parsed });

  revalidatePath("/admin/settings");
  revalidatePath("/", "layout");
}
