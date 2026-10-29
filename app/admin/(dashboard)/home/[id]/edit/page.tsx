import { notFound } from "next/navigation";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { FormField } from "@/components/admin/form-field";
import { TextareaField } from "@/components/admin/textarea-field";
import { SubmitButton } from "@/components/admin/submit-button";
import { updateHeroSlideAction } from "../../actions";

export const instant = false;

export default async function EditHeroSlidePage({ params }: { params: Promise<{ id: string }> }) {
  await connection();
  const { id } = await params;
  const slide = await prisma.heroSlide.findUnique({ where: { id } });
  if (!slide) notFound();

  const action = updateHeroSlideAction.bind(null, id);

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold text-white">Edit Hero Slide</h1>
      <form action={action} className="mt-8 flex flex-col gap-5">
        <FormField label="Eyebrow" name="eyebrow" defaultValue={slide.eyebrow} required />
        <FormField label="Headline — light word" name="headlineLead" defaultValue={slide.headlineLead} required />
        <FormField label="Headline — emphasis" name="headlineEmphasis" defaultValue={slide.headlineEmphasis} required />
        <TextareaField label="Description" name="description" defaultValue={slide.description} rows={3} required />
        <FormField label="Primary CTA Label" name="primaryCtaLabel" defaultValue={slide.primaryCtaLabel} required />
        <FormField label="Primary CTA Link" name="primaryCtaHref" defaultValue={slide.primaryCtaHref} required />
        <FormField label="Secondary CTA Label" name="secondaryCtaLabel" defaultValue={slide.secondaryCtaLabel} required />
        <FormField label="Secondary CTA Link" name="secondaryCtaHref" defaultValue={slide.secondaryCtaHref} required />
        <div>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
