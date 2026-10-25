import { notFound } from "next/navigation";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { FormField } from "@/components/admin/form-field";
import { TextareaField } from "@/components/admin/textarea-field";
import { ToggleField } from "@/components/admin/toggle-field";
import { MediaPicker } from "@/components/admin/media-picker";
import { SelectField } from "@/components/admin/select-field";
import { SubmitButton } from "@/components/admin/submit-button";
import { updateTeamMemberAction } from "../../actions";

export const instant = false;

export default async function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  await connection();
  const { id } = await params;
  const [member, members] = await Promise.all([
    prisma.teamMember.findUnique({ where: { id } }),
    prisma.teamMember.findMany({ orderBy: { order: "asc" } }),
  ]);
  if (!member) notFound();

  const action = updateTeamMemberAction.bind(null, id);

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold text-white">Edit Team Member</h1>
      <form action={action} className="mt-8 flex flex-col gap-5">
        <FormField label="Name" name="name" defaultValue={member.name} required />
        <FormField label="Role" name="role" defaultValue={member.role} required />
        <TextareaField label="Bio" name="bio" defaultValue={member.bio} rows={4} />
        <MediaPicker label="Photo" name="photoMediaId" defaultValue={member.photoMediaId} />
        <FormField label="LinkedIn URL" name="linkedinUrl" defaultValue={member.linkedinUrl} />
        <FormField label="Email" name="email" type="email" defaultValue={member.email} />
        <SelectField
          label="Reports To"
          name="reportsToId"
          defaultValue={member.reportsToId}
          options={members
            .filter((candidate) => candidate.id !== id)
            .map((candidate) => ({ value: candidate.id, label: `${candidate.name} — ${candidate.role}` }))}
          placeholder="— No one (top of the org chart) —"
          hint="Drives the hierarchy tree on the public Team page."
        />
        <ToggleField label="Published" name="published" defaultChecked={member.published} />
        <div>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
