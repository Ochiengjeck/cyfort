import { FormField } from "@/components/admin/form-field";
import { TextareaField } from "@/components/admin/textarea-field";
import { SubmitButton } from "@/components/admin/submit-button";
import { createDifferentiatorAction } from "../actions";

export default function NewDifferentiatorPage() {
  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold text-white">New Differentiator</h1>
      <form action={createDifferentiatorAction} className="mt-8 flex flex-col gap-5">
        <FormField label="Title" name="title" required />
        <TextareaField label="Body" name="body" rows={4} required />
        <div>
          <SubmitButton label="Create" pendingLabel="Creating…" />
        </div>
      </form>
    </div>
  );
}
