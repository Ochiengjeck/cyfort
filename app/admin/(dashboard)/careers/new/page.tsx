import { FormField } from "@/components/admin/form-field";
import { TextareaField } from "@/components/admin/textarea-field";
import { ToggleField } from "@/components/admin/toggle-field";
import { MediaPicker } from "@/components/admin/media-picker";
import { SubmitButton } from "@/components/admin/submit-button";
import { createJobPostingAction } from "../actions";

export default function NewJobPostingPage() {
  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold text-white">New Open Role</h1>
      <form action={createJobPostingAction} className="mt-8 flex flex-col gap-5">
        <FormField label="Title" name="title" required />
        <FormField label="Slug" name="slug" hint="Leave blank to generate from the title." />
        <div className="grid grid-cols-2 gap-5">
          <FormField label="Department" name="department" />
          <FormField label="Location" name="location" />
        </div>
        <FormField label="Employment Type" name="employmentType" placeholder="Full-time" />
        <TextareaField label="Summary" name="summary" rows={2} required />
        <TextareaField label="Description (Markdown)" name="description" rows={6} required hint="About the Role intro paragraph." />
        <MediaPicker label="Cover Image" name="coverMediaId" />
        <TextareaField label="Responsibilities" name="responsibilities" rows={5} hint="One per line." />
        <TextareaField label="Requirements" name="requirements" rows={5} hint="One per line." />
        <TextareaField label="Benefits" name="benefits" rows={4} hint="One per line." />
        <FormField label="Salary Range" name="salaryRange" placeholder="e.g. Competitive, based on experience" />
        <FormField label="Apply Email" name="applyEmail" hint="Falls back to the site's contact email if blank." />
        <FormField label="Closes At" name="closesAt" type="date" />
        <ToggleField label="Published" name="published" />
        <div>
          <SubmitButton label="Create" pendingLabel="Creating…" />
        </div>
      </form>
    </div>
  );
}
