import { prisma } from "@/lib/prisma";
import { FormField } from "@/components/admin/form-field";
import { TextareaField } from "@/components/admin/textarea-field";
import { ToggleField } from "@/components/admin/toggle-field";
import { MediaPicker } from "@/components/admin/media-picker";
import { SelectField } from "@/components/admin/select-field";
import { SubmitButton } from "@/components/admin/submit-button";
import { createTeamMemberAction } from "../actions";

export const instant = false;

export default async function NewTeamMemberPage() {
  const members = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });

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
        <SelectField
          label="Reports To"
          name="reportsToId"
          options={members.map((member) => ({ value: member.id, label: `${member.name} — ${member.role}` }))}
          placeholder="— No one (top of the org chart) —"
          hint="Drives the hierarchy tree on the public Team page."
        />
        <ToggleField label="Published" name="published" defaultChecked />
        <div>
          <SubmitButton label="Create" pendingLabel="Creating…" />
        </div>
      </form>
    </div>
  );
}
