import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { FormField } from "@/components/admin/form-field";
import { TextareaField } from "@/components/admin/textarea-field";
import { SubmitButton } from "@/components/admin/submit-button";
import { updateAboutContentAction } from "./actions";

export const instant = false;

export default async function AdminAboutPage() {
  await connection();
  const about = await prisma.aboutContent.findFirst();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-white">About Page</h1>
      <p className="mt-1 text-sm text-white/50">
        Who We Are, Vision, Mission, Approach, and the closing section. Separate paragraphs with a
        blank line.
      </p>

      <form action={updateAboutContentAction} className="mt-8 flex flex-col gap-5">
        <TextareaField
          label="Who We Are (body)"
          name="whoWeAreBody"
          defaultValue={about?.whoWeAreBody}
          rows={10}
          required
        />
        <TextareaField label="Pull Quote" name="pullQuote" defaultValue={about?.pullQuote} rows={2} required />
        <TextareaField label="Vision" name="vision" defaultValue={about?.vision} rows={3} required />
        <TextareaField label="Mission" name="mission" defaultValue={about?.mission} rows={3} required />
        <TextareaField
          label="Approach — Intro"
          name="approachIntro"
          defaultValue={about?.approachIntro}
          rows={4}
          required
        />
        <TextareaField
          label="Approach — Body"
          name="approachBody"
          defaultValue={about?.approachBody}
          rows={4}
          required
        />

        <div className="grid grid-cols-2 gap-5">
          <FormField label="Comparison Left Label" name="comparisonLeftLabel" defaultValue={about?.comparisonLeftLabel} required />
          <FormField label="Comparison Left Text" name="comparisonLeftText" defaultValue={about?.comparisonLeftText} required />
          <FormField label="Comparison Right Label" name="comparisonRightLabel" defaultValue={about?.comparisonRightLabel} required />
          <FormField label="Comparison Right Text" name="comparisonRightText" defaultValue={about?.comparisonRightText} required />
        </div>

        <FormField label="Closing Eyebrow" name="closingEyebrow" defaultValue={about?.closingEyebrow} required />
        <FormField label="Closing Heading" name="closingHeading" defaultValue={about?.closingHeading} required />
        <TextareaField label="Closing Body" name="closingBody" defaultValue={about?.closingBody} rows={5} required />
        <TextareaField label="Closing Quote" name="closingQuote" defaultValue={about?.closingQuote} rows={3} required />

        <div>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
