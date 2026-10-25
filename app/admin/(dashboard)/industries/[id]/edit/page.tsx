import { notFound } from "next/navigation";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { FormField } from "@/components/admin/form-field";
import { TextareaField } from "@/components/admin/textarea-field";
import { MediaPicker } from "@/components/admin/media-picker";
import { SubmitButton } from "@/components/admin/submit-button";
import { updateIndustryAction } from "../../actions";

export const instant = false;

export default async function EditIndustryPage({ params }: { params: Promise<{ id: string }> }) {
  await connection();
  const { id } = await params;
  const item = await prisma.industry.findUnique({ where: { id } });
  if (!item) notFound();

  const action = updateIndustryAction.bind(null, id);

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold text-white">Edit Industry</h1>
      <form action={action} className="mt-8 flex flex-col gap-5">
        <FormField label="Name" name="name" defaultValue={item.name} required />
        <TextareaField label="Blurb" name="blurb" defaultValue={item.blurb} rows={2} />
        <FormField label="Icon" name="icon" defaultValue={item.icon} hint="A lucide-react icon name, e.g. landmark." />
        <MediaPicker label="Image" name="imageMediaId" defaultValue={item.imageMediaId} />
        <div>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
