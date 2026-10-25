import { FormField } from "@/components/admin/form-field";
import { TextareaField } from "@/components/admin/textarea-field";
import { MediaPicker } from "@/components/admin/media-picker";
import { SubmitButton } from "@/components/admin/submit-button";
import { createIndustryAction } from "../actions";

export default function NewIndustryPage() {
  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold text-white">New Industry</h1>
      <form action={createIndustryAction} className="mt-8 flex flex-col gap-5">
        <FormField label="Name" name="name" required />
        <TextareaField label="Blurb" name="blurb" rows={2} />
        <FormField label="Icon" name="icon" hint="A lucide-react icon name, e.g. landmark." />
        <MediaPicker label="Image" name="imageMediaId" />
        <div>
          <SubmitButton label="Create" pendingLabel="Creating…" />
        </div>
      </form>
    </div>
  );
}
