import { FormField } from "@/components/admin/form-field";
import { TextareaField } from "@/components/admin/textarea-field";
import { SubmitButton } from "@/components/admin/submit-button";
import { createLegalPageAction } from "../actions";

export default function NewLegalPagePage() {
  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold text-white">New Legal Page</h1>
      <form action={createLegalPageAction} className="mt-8 flex flex-col gap-5">
        <FormField label="Title" name="title" required />
        <FormField label="Slug" name="slug" required hint="The page's URL, e.g. 'terms' for /terms." />
        <TextareaField label="Body (Markdown)" name="body" rows={16} required />
        <div>
          <SubmitButton label="Create" pendingLabel="Creating…" />
        </div>
      </form>
    </div>
  );
}
