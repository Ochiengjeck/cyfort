import { notFound } from "next/navigation";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { FormField } from "@/components/admin/form-field";
import { TextareaField } from "@/components/admin/textarea-field";
import { SubmitButton } from "@/components/admin/submit-button";
import { updatePromiseItemAction } from "../../actions";

export const instant = false;

export default async function EditPromiseItemPage({ params }: { params: Promise<{ id: string }> }) {
  await connection();
  const { id } = await params;
  const item = await prisma.promiseItem.findUnique({ where: { id } });
  if (!item) notFound();

  const action = updatePromiseItemAction.bind(null, id);

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold text-white">Edit Promise Item</h1>
      <form action={action} className="mt-8 flex flex-col gap-5">
        <FormField label="Title" name="title" defaultValue={item.title} required />
        <TextareaField label="Body" name="body" defaultValue={item.body} rows={3} required />
        <div>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
