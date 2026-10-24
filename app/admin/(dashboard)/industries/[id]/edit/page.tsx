import { notFound } from "next/navigation";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { FormField } from "@/components/admin/form-field";
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
        <div>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
