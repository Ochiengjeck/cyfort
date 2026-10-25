import { notFound } from "next/navigation";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { FormField } from "@/components/admin/form-field";
import { TextareaField } from "@/components/admin/textarea-field";
import { ToggleField } from "@/components/admin/toggle-field";
import { MediaPicker } from "@/components/admin/media-picker";
import { SubmitButton } from "@/components/admin/submit-button";
import { updateJobPostingAction } from "../../actions";

export const instant = false;

export default async function EditJobPostingPage({ params }: { params: Promise<{ id: string }> }) {
  await connection();
  const { id } = await params;
  const job = await prisma.jobPosting.findUnique({ where: { id } });
  if (!job) notFound();

  const action = updateJobPostingAction.bind(null, id);
  const closesAtValue = job.closesAt ? job.closesAt.toISOString().slice(0, 10) : undefined;

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold text-white">Edit Open Role</h1>
      <form action={action} className="mt-8 flex flex-col gap-5">
        <FormField label="Title" name="title" defaultValue={job.title} required />
        <FormField label="Slug" name="slug" defaultValue={job.slug} required />
        <div className="grid grid-cols-2 gap-5">
          <FormField label="Department" name="department" defaultValue={job.department} />
          <FormField label="Location" name="location" defaultValue={job.location} />
        </div>
        <FormField label="Employment Type" name="employmentType" defaultValue={job.employmentType} />
        <TextareaField label="Summary" name="summary" defaultValue={job.summary} rows={2} required />
        <TextareaField
          label="Description (Markdown)"
          name="description"
          defaultValue={job.description}
          rows={6}
          required
          hint="About the Role intro paragraph."
        />
        <MediaPicker label="Cover Image" name="coverMediaId" defaultValue={job.coverMediaId} />
        <TextareaField label="Responsibilities" name="responsibilities" defaultValue={job.responsibilities} rows={5} hint="One per line." />
        <TextareaField label="Requirements" name="requirements" defaultValue={job.requirements} rows={5} hint="One per line." />
        <TextareaField label="Benefits" name="benefits" defaultValue={job.benefits} rows={4} hint="One per line." />
        <FormField
          label="Salary Range"
          name="salaryRange"
          defaultValue={job.salaryRange}
          placeholder="e.g. Competitive, based on experience"
        />
        <FormField label="Apply Email" name="applyEmail" defaultValue={job.applyEmail} />
        <FormField label="Closes At" name="closesAt" type="date" defaultValue={closesAtValue} />
        <ToggleField label="Published" name="published" defaultChecked={job.published} />
        <div>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
