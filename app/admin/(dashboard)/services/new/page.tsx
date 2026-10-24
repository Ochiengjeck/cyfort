import { FormField } from "@/components/admin/form-field";
import { TextareaField } from "@/components/admin/textarea-field";
import { RepeatableListField } from "@/components/admin/repeatable-list-field";
import { SubmitButton } from "@/components/admin/submit-button";
import { createServiceAction } from "../actions";

export default function NewServicePage() {
  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold text-white">New Service</h1>
      <form action={createServiceAction} className="mt-8 flex flex-col gap-5">
        <FormField label="Name" name="name" required />
        <FormField label="Slug" name="slug" hint="Leave blank to generate from the name." />
        <TextareaField label="Summary" name="summary" rows={3} required />
        <RepeatableListField label="Sub-services" fieldName="items" />
        <div>
          <SubmitButton label="Create" pendingLabel="Creating…" />
        </div>
      </form>
    </div>
  );
}
