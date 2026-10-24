import { notFound } from "next/navigation";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { FormField } from "@/components/admin/form-field";
import { TextareaField } from "@/components/admin/textarea-field";
import { SubmitButton } from "@/components/admin/submit-button";
import { updateDifferentiatorAction } from "../../actions";

export const instant = false;

export default async function EditDifferentiatorPage({ params }: { params: Promise<{ id: string }> }) {
  await connection();
  const { id } = await params;
  const item = await prisma.differentiator.findUnique({ where: { id } });
  if (!item) notFound();

  const action = updateDifferentiatorAction.bind(null, id);

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold text-white">Edit Differentiator</h1>
      <form action={action} className="mt-8 flex flex-col gap-5">
        <FormField label="Title" name="title" defaultValue={item.title} required />
        <TextareaField label="Body" name="body" defaultValue={item.body} rows={4} required />
        <div>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
