import { FormField } from "@/components/admin/form-field";
import { TextareaField } from "@/components/admin/textarea-field";
import { ToggleField } from "@/components/admin/toggle-field";
import { MediaPicker } from "@/components/admin/media-picker";
import { SubmitButton } from "@/components/admin/submit-button";
import { createTeamMemberAction } from "../actions";

export default function NewTeamMemberPage() {
  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold text-white">New Team Member</h1>
      <form action={createTeamMemberAction} className="mt-8 flex flex-col gap-5">
        <FormField label="Name" name="name" required />
        <FormField label="Role" name="role" required />
        <TextareaField label="Bio" name="bio" rows={4} />
        <MediaPicker label="Photo" name="photoMediaId" />
        <FormField label="LinkedIn URL" name="linkedinUrl" />
        <FormField label="Email" name="email" type="email" />
        <ToggleField label="Published" name="published" defaultChecked />
        <div>
          <SubmitButton label="Create" pendingLabel="Creating…" />
        </div>
      </form>
    </div>
  );
}
