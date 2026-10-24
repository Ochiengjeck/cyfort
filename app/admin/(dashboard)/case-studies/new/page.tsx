import { FormField } from "@/components/admin/form-field";
import { TextareaField } from "@/components/admin/textarea-field";
import { ToggleField } from "@/components/admin/toggle-field";
import { MediaPicker } from "@/components/admin/media-picker";
import { SubmitButton } from "@/components/admin/submit-button";
import { createCaseStudyAction } from "../actions";

export default function NewCaseStudyPage() {
  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold text-white">New Case Study</h1>
      <form action={createCaseStudyAction} className="mt-8 flex flex-col gap-5">
        <FormField label="Title" name="title" required />
        <FormField label="Slug" name="slug" hint="Leave blank to generate from the title." />
        <FormField label="Client Name" name="clientName" required />
        <FormField label="Industry Tag" name="industryTag" />
        <TextareaField label="Summary" name="summary" rows={3} required />
        <TextareaField label="Body (Markdown)" name="body" rows={12} required />
        <MediaPicker label="Cover Image" name="coverMediaId" />
        <ToggleField label="Published" name="published" />
        <div>
          <SubmitButton label="Create" pendingLabel="Creating…" />
        </div>
      </form>
    </div>
  );
}
