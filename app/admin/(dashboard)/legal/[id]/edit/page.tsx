import { notFound } from "next/navigation";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { FormField } from "@/components/admin/form-field";
import { TextareaField } from "@/components/admin/textarea-field";
import { SubmitButton } from "@/components/admin/submit-button";
import { updateLegalPageAction } from "../../actions";

export const instant = false;

export default async function EditLegalPagePage({ params }: { params: Promise<{ id: string }> }) {
  await connection();
  const { id } = await params;
  const page = await prisma.legalPage.findUnique({ where: { id } });
  if (!page) notFound();

  const action = updateLegalPageAction.bind(null, id);

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold text-white">Edit Legal Page</h1>
      <form action={action} className="mt-8 flex flex-col gap-5">
        <FormField label="Title" name="title" defaultValue={page.title} required />
        <FormField label="Slug" name="slug" defaultValue={page.slug} required />
        <TextareaField label="Body (Markdown)" name="body" defaultValue={page.body} rows={16} required />
        <div>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
