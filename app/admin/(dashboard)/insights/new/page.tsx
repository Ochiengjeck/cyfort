import { FormField } from "@/components/admin/form-field";
import { TextareaField } from "@/components/admin/textarea-field";
import { ToggleField } from "@/components/admin/toggle-field";
import { MediaPicker } from "@/components/admin/media-picker";
import { SubmitButton } from "@/components/admin/submit-button";
import { createInsightPostAction } from "../actions";

export default function NewInsightPostPage() {
  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold text-white">New Insight Post</h1>
      <form action={createInsightPostAction} className="mt-8 flex flex-col gap-5">
        <FormField label="Title" name="title" required />
        <FormField label="Slug" name="slug" hint="Leave blank to generate from the title." />
        <TextareaField label="Excerpt" name="excerpt" rows={2} required />
        <TextareaField label="Body (Markdown)" name="body" rows={12} required />
        <MediaPicker label="Cover Image" name="coverMediaId" />
        <FormField label="Author Name" name="authorName" />
        <FormField label="Author Role" name="authorRole" />
        <FormField label="Category" name="category" />
        <FormField label="Tags" name="tags" hint="Comma-separated, e.g. Cybersecurity, Risk Management." />
        <ToggleField label="Published" name="published" />
        <div>
          <SubmitButton label="Create" pendingLabel="Creating…" />
        </div>
      </form>
    </div>
  );
}
