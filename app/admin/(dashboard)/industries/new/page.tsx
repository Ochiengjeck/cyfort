import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { FormField } from "@/components/admin/form-field";
import { TextareaField } from "@/components/admin/textarea-field";
import { MediaPicker } from "@/components/admin/media-picker";
import { SelectField } from "@/components/admin/select-field";
import { ToggleField } from "@/components/admin/toggle-field";
import { SubmitButton } from "@/components/admin/submit-button";
import { createIndustryAction } from "../actions";

export const instant = false;

export default async function NewIndustryPage() {
  await connection();
  const services = await prisma.service.findMany({ orderBy: { order: "asc" }, select: { id: true, name: true } });

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold text-white">New Industry</h1>
      <form action={createIndustryAction} className="mt-8 flex flex-col gap-5">
        <FormField label="Name" name="name" required />
        <TextareaField label="Blurb" name="blurb" rows={2} hint="Used for the 'We also serve' tier." />
        <FormField label="Icon" name="icon" hint="A lucide-react icon name, e.g. landmark." />
        <MediaPicker label="Image" name="imageMediaId" />
        <ToggleField
          label="Featured focus industry"
          name="featured"
          hint="Shown as one of the 4 numbered focus industries, with the fields below."
        />
        <TextareaField
          label="What's driving it"
          name="drivingText"
          rows={3}
          hint="The regulatory/scrutiny driver for this sector (featured industries only)."
        />
        <TextareaField
          label="Where we start"
          name="startText"
          rows={2}
          hint="Which service to lead with for this sector (featured industries only)."
        />
        <SelectField
          label="Starting service"
          name="startServiceId"
          options={services.map((service) => ({ value: service.id, label: service.name }))}
        />
        <div>
          <SubmitButton label="Create" pendingLabel="Creating…" />
        </div>
      </form>
    </div>
  );
}
