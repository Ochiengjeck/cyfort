import { notFound } from "next/navigation";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { FormField } from "@/components/admin/form-field";
import { TextareaField } from "@/components/admin/textarea-field";
import { RepeatableListField } from "@/components/admin/repeatable-list-field";
import { SelectField } from "@/components/admin/select-field";
import { ToggleField } from "@/components/admin/toggle-field";
import { SubmitButton } from "@/components/admin/submit-button";
import { updateServiceAction } from "../../actions";

export const instant = false;

const PILLAR_OPTIONS = [
  { value: "ADVISE", label: "Advise" },
  { value: "SECURE_ASSURE", label: "Secure & Assure" },
  { value: "BUILD_RUN", label: "Build & Run" },
];

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  await connection();
  const { id } = await params;
  const service = await prisma.service.findUnique({
    where: { id },
    include: { items: { orderBy: { order: "asc" } } },
  });
  if (!service) notFound();

  const action = updateServiceAction.bind(null, id);

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold text-white">Edit Service</h1>
      <form action={action} className="mt-8 flex flex-col gap-5">
        <FormField label="Name" name="name" defaultValue={service.name} required />
        <FormField label="Slug" name="slug" defaultValue={service.slug} required />
        <TextareaField label="Summary" name="summary" defaultValue={service.summary} rows={3} required />
        <FormField label="Icon" name="icon" defaultValue={service.icon} hint="A lucide-react icon name, e.g. shield-check." />
        <RepeatableListField
          label="Sub-services"
          fieldName="items"
          defaultValues={service.items.map((item) => item.label)}
        />
        <TextareaField
          label="Approach (Markdown)"
          name="approach"
          defaultValue={service.approach ?? ""}
          rows={6}
          hint="Narrative shown in the 'Our Approach' section."
        />
        <TextareaField
          label="Outcomes"
          name="outcomes"
          defaultValue={service.outcomes ?? ""}
          rows={5}
          hint="One outcome per line."
        />
        <SelectField
          label="Pillar"
          name="pillar"
          defaultValue={service.pillar}
          options={PILLAR_OPTIONS}
          placeholder="— Select —"
          hint="Which 'full capabilities' group this service belongs to."
        />
        <ToggleField
          label="Key service"
          name="featured"
          defaultChecked={service.featured}
          hint="Shown as one of the 4 featured services on Home, Services and the navbar dropdown."
        />
        <FormField label="CTA label" name="ctaLabel" defaultValue={service.ctaLabel} hint="e.g. 'Book a Data Protection Health Check' (key services only)." />
        <FormField label="CTA link" name="ctaHref" defaultValue={service.ctaHref} hint="e.g. /contact (key services only)." />
        <TextareaField label="Built for" name="builtForTags" defaultValue={service.builtForTags} rows={2} hint="One tag per line (key services only)." />
        <TextareaField
          label="Trigger text"
          name="triggerText"
          defaultValue={service.triggerText}
          rows={2}
          hint="'What's driving the conversation' card text (key services only)."
        />
        <div>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
