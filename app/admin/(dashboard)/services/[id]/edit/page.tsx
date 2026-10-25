import { notFound } from "next/navigation";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { FormField } from "@/components/admin/form-field";
import { TextareaField } from "@/components/admin/textarea-field";
import { RepeatableListField } from "@/components/admin/repeatable-list-field";
import { SubmitButton } from "@/components/admin/submit-button";
import { updateServiceAction } from "../../actions";

export const instant = false;

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  await connection();
  const { id } = await params;
  const service = await prisma.service.findUnique({
    where: { id },
    include: { items: { orderBy: { order: "asc" } } },
  });
  if (!service) notFound();

  const action = updateServiceAction.bind(null, id);

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold text-white">Edit Service</h1>
      <form action={action} className="mt-8 flex flex-col gap-5">
        <FormField label="Name" name="name" defaultValue={service.name} required />
        <FormField label="Slug" name="slug" defaultValue={service.slug} required />
        <TextareaField label="Summary" name="summary" defaultValue={service.summary} rows={3} required />
        <FormField label="Icon" name="icon" defaultValue={service.icon} hint="A lucide-react icon name, e.g. shield-check." />
        <RepeatableListField
          label="Sub-services"
          fieldName="items"
          defaultValues={service.items.map((item) => item.label)}
        />
        <TextareaField
          label="Approach (Markdown)"
          name="approach"
          defaultValue={service.approach ?? ""}
          rows={6}
          hint="Narrative shown in the 'Our Approach' section."
        />
        <TextareaField
          label="Outcomes"
          name="outcomes"
          defaultValue={service.outcomes ?? ""}
          rows={5}
          hint="One outcome per line."
        />
        <div>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
