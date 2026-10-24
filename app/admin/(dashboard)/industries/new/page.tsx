import { FormField } from "@/components/admin/form-field";
import { SubmitButton } from "@/components/admin/submit-button";
import { createIndustryAction } from "../actions";

export default function NewIndustryPage() {
  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold text-white">New Industry</h1>
      <form action={createIndustryAction} className="mt-8 flex flex-col gap-5">
        <FormField label="Name" name="name" required />
        <div>
          <SubmitButton label="Create" pendingLabel="Creating…" />
        </div>
      </form>
    </div>
  );
}
