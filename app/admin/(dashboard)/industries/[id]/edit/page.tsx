import { notFound } from "next/navigation";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { FormField } from "@/components/admin/form-field";
import { TextareaField } from "@/components/admin/textarea-field";
import { MediaPicker } from "@/components/admin/media-picker";
import { SelectField } from "@/components/admin/select-field";
import { ToggleField } from "@/components/admin/toggle-field";
import { SubmitButton } from "@/components/admin/submit-button";
import { updateIndustryAction } from "../../actions";

export const instant = false;

export default async function EditIndustryPage({ params }: { params: Promise<{ id: string }> }) {
  await connection();
  const { id } = await params;
  const [item, services] = await Promise.all([
    prisma.industry.findUnique({ where: { id } }),
    prisma.service.findMany({ orderBy: { order: "asc" }, select: { id: true, name: true } }),
  ]);
  if (!item) notFound();

  const action = updateIndustryAction.bind(null, id);

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold text-white">Edit Industry</h1>
      <form action={action} className="mt-8 flex flex-col gap-5">
        <FormField label="Name" name="name" defaultValue={item.name} required />
        <TextareaField label="Blurb" name="blurb" defaultValue={item.blurb} rows={2} hint="Used for the 'We also serve' tier." />
        <FormField label="Icon" name="icon" defaultValue={item.icon} hint="A lucide-react icon name, e.g. landmark." />
        <MediaPicker label="Image" name="imageMediaId" defaultValue={item.imageMediaId} />
        <ToggleField
          label="Featured focus industry"
          name="featured"
          defaultChecked={item.featured}
          hint="Shown as one of the 4 numbered focus industries, with the fields below."
        />
        <TextareaField
          label="What's driving it"
          name="drivingText"
          defaultValue={item.drivingText}
          rows={3}
          hint="The regulatory/scrutiny driver for this sector (featured industries only)."
        />
        <TextareaField
          label="Where we start"
          name="startText"
          defaultValue={item.startText}
          rows={2}
          hint="Which service to lead with for this sector (featured industries only)."
        />
        <SelectField
          label="Starting service"
          name="startServiceId"
          defaultValue={item.startServiceId}
          options={services.map((service) => ({ value: service.id, label: service.name }))}
        />
        <div>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
