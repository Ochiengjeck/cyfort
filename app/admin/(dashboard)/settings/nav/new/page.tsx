import { FormField } from "@/components/admin/form-field";
import { ToggleField } from "@/components/admin/toggle-field";
import { SubmitButton } from "@/components/admin/submit-button";
import { createNavLinkAction } from "../actions";

export default function NewNavLinkPage() {
  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold text-white">New Nav Link</h1>
      <form action={createNavLinkAction} className="mt-8 flex flex-col gap-5">
        <FormField label="Label" name="label" required />
        <FormField label="Href" name="href" required placeholder="/about" />
        <ToggleField label="Open in new tab" name="openInNewTab" />
        <div>
          <SubmitButton label="Create" pendingLabel="Creating…" />
        </div>
      </form>
    </div>
  );
}
