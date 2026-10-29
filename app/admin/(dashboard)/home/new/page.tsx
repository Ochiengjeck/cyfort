import { FormField } from "@/components/admin/form-field";
import { TextareaField } from "@/components/admin/textarea-field";
import { SubmitButton } from "@/components/admin/submit-button";
import { createHeroSlideAction } from "../actions";

export default function NewHeroSlidePage() {
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold text-white">New Hero Slide</h1>
      <form action={createHeroSlideAction} className="mt-8 flex flex-col gap-5">
        <FormField label="Eyebrow" name="eyebrow" required />
        <FormField label="Headline — light word" name="headlineLead" required />
        <FormField label="Headline — emphasis" name="headlineEmphasis" required />
        <TextareaField label="Description" name="description" rows={3} required />
        <FormField label="Primary CTA Label" name="primaryCtaLabel" required />
        <FormField label="Primary CTA Link" name="primaryCtaHref" required />
        <FormField label="Secondary CTA Label" name="secondaryCtaLabel" required />
        <FormField label="Secondary CTA Link" name="secondaryCtaHref" required />
        <div>
          <SubmitButton label="Create" pendingLabel="Creating…" />
        </div>
      </form>
    </div>
  );
}
