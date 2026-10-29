import { FormField } from "@/components/admin/form-field";
import { TextareaField } from "@/components/admin/textarea-field";
import { RepeatableListField } from "@/components/admin/repeatable-list-field";
import { SelectField } from "@/components/admin/select-field";
import { ToggleField } from "@/components/admin/toggle-field";
import { SubmitButton } from "@/components/admin/submit-button";
import { createServiceAction } from "../actions";

const PILLAR_OPTIONS = [
  { value: "ADVISE", label: "Advise" },
  { value: "SECURE_ASSURE", label: "Secure & Assure" },
  { value: "BUILD_RUN", label: "Build & Run" },
];

export default function NewServicePage() {
  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold text-white">New Service</h1>
      <form action={createServiceAction} className="mt-8 flex flex-col gap-5">
        <FormField label="Name" name="name" required />
        <FormField label="Slug" name="slug" hint="Leave blank to generate from the name." />
        <TextareaField label="Summary" name="summary" rows={3} required />
        <FormField label="Icon" name="icon" hint="A lucide-react icon name, e.g. shield-check." />
        <RepeatableListField label="Sub-services" fieldName="items" />
        <TextareaField label="Approach (Markdown)" name="approach" rows={6} hint="Narrative shown in the 'Our Approach' section." />
        <TextareaField label="Outcomes" name="outcomes" rows={5} hint="One outcome per line." />
        <SelectField
          label="Pillar"
          name="pillar"
          defaultValue="SECURE_ASSURE"
          options={PILLAR_OPTIONS}
          placeholder="— Select —"
          hint="Which 'full capabilities' group this service belongs to."
        />
        <ToggleField
          label="Key service"
          name="featured"
          hint="Shown as one of the 4 featured services on Home, Services and the navbar dropdown."
        />
        <FormField label="CTA label" name="ctaLabel" hint="e.g. 'Book a Data Protection Health Check' (key services only)." />
        <FormField label="CTA link" name="ctaHref" hint="e.g. /contact (key services only)." />
        <TextareaField label="Built for" name="builtForTags" rows={2} hint="One tag per line (key services only)." />
        <TextareaField
          label="Trigger text"
          name="triggerText"
          rows={2}
          hint="'What's driving the conversation' card text (key services only)."
        />
        <div>
          <SubmitButton label="Create" pendingLabel="Creating…" />
        </div>
      </form>
    </div>
  );
}
