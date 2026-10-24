import { FormField } from "@/components/admin/form-field";
import { TextareaField } from "@/components/admin/textarea-field";
import { SubmitButton } from "@/components/admin/submit-button";
import { createPromiseItemAction } from "../actions";

export default function NewPromiseItemPage() {
  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold text-white">New Promise Item</h1>
      <form action={createPromiseItemAction} className="mt-8 flex flex-col gap-5">
        <FormField label="Title" name="title" required />
        <TextareaField label="Body" name="body" rows={3} required />
        <div>
          <SubmitButton label="Create" pendingLabel="Creating…" />
        </div>
      </form>
    </div>
  );
}
