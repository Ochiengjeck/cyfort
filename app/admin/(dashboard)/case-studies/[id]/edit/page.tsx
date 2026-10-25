import { notFound } from "next/navigation";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { FormField } from "@/components/admin/form-field";
import { TextareaField } from "@/components/admin/textarea-field";
import { ToggleField } from "@/components/admin/toggle-field";
import { MediaPicker } from "@/components/admin/media-picker";
import { SubmitButton } from "@/components/admin/submit-button";
import { updateCaseStudyAction } from "../../actions";

export const instant = false;

export default async function EditCaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  await connection();
  const { id } = await params;
  const item = await prisma.caseStudy.findUnique({ where: { id } });
  if (!item) notFound();

  const action = updateCaseStudyAction.bind(null, id);

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold text-white">Edit Case Study</h1>
      <form action={action} className="mt-8 flex flex-col gap-5">
        <FormField label="Title" name="title" defaultValue={item.title} required />
        <FormField label="Slug" name="slug" defaultValue={item.slug} required />
        <FormField label="Client Name" name="clientName" defaultValue={item.clientName} required />
        <FormField label="Industry Tag" name="industryTag" defaultValue={item.industryTag} />
        <TextareaField label="Summary" name="summary" defaultValue={item.summary} rows={3} required />
        <TextareaField label="Body (Markdown)" name="body" defaultValue={item.body} rows={12} required />
        <MediaPicker label="Cover Image" name="coverMediaId" defaultValue={item.coverMediaId} />
        <TextareaField
          label="Results Summary"
          name="resultsSummary"
          defaultValue={item.resultsSummary}
          rows={4}
          hint="One metric/result per line, shown as a stat row."
        />
        <TextareaField label="Testimonial Quote" name="testimonialQuote" defaultValue={item.testimonialQuote} rows={3} />
        <FormField label="Testimonial Author" name="testimonialAuthor" defaultValue={item.testimonialAuthor} />
        <FormField label="Duration" name="duration" defaultValue={item.duration} placeholder="e.g. 8 weeks" />
        <FormField label="Team Size" name="teamSize" defaultValue={item.teamSize} placeholder="e.g. 3 consultants" />
        <ToggleField label="Published" name="published" defaultChecked={item.published} />
        <div>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
