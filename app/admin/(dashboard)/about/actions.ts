"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { aboutContentSchema } from "@/lib/validation/aboutContent";

export async function updateAboutContentAction(formData: FormData) {
  const data = aboutContentSchema.parse({
    whoWeAreBody: formData.get("whoWeAreBody"),
    pullQuote: formData.get("pullQuote"),
    vision: formData.get("vision"),
    mission: formData.get("mission"),
    approachIntro: formData.get("approachIntro"),
    approachBody: formData.get("approachBody"),
    comparisonLeftLabel: formData.get("comparisonLeftLabel"),
    comparisonLeftText: formData.get("comparisonLeftText"),
    comparisonRightLabel: formData.get("comparisonRightLabel"),
    comparisonRightText: formData.get("comparisonRightText"),
    closingEyebrow: formData.get("closingEyebrow"),
    closingHeading: formData.get("closingHeading"),
    closingBody: formData.get("closingBody"),
    closingQuote: formData.get("closingQuote"),
  });

  const existing = await prisma.aboutContent.findFirst();
  if (existing) {
    await prisma.aboutContent.update({ where: { id: existing.id }, data });
  } else {
    await prisma.aboutContent.create({ data });
  }

  revalidatePath("/admin/about");
  revalidatePath("/about");
  revalidatePath("/");
}
