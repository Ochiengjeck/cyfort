import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { FormField } from "@/components/admin/form-field";
import { SubmitButton } from "@/components/admin/submit-button";
import { updateHomeHeroAction } from "./actions";

export const instant = false;

export default async function AdminHomeHeroPage() {
  await connection();
  const hero = await prisma.homeHero.findFirst();

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold text-white">Home Hero</h1>
      <p className="mt-1 text-sm text-white/50">The headline section at the top of the homepage.</p>

      <form action={updateHomeHeroAction} className="mt-8 flex flex-col gap-5">
        <FormField label="Eyebrow" name="eyebrow" defaultValue={hero?.eyebrow} required />
        <FormField label="Headline — light word" name="headlineLead" defaultValue={hero?.headlineLead} required />
        <FormField label="Headline — emphasis" name="headlineEmphasis" defaultValue={hero?.headlineEmphasis} required />
        <FormField label="Primary CTA Label" name="primaryCtaLabel" defaultValue={hero?.primaryCtaLabel} required />
        <FormField label="Primary CTA Link" name="primaryCtaHref" defaultValue={hero?.primaryCtaHref} required />
        <FormField label="Secondary CTA Label" name="secondaryCtaLabel" defaultValue={hero?.secondaryCtaLabel} required />
        <FormField label="Secondary CTA Link" name="secondaryCtaHref" defaultValue={hero?.secondaryCtaHref} required />
        <div>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
