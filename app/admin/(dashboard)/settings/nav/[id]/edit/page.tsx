import { notFound } from "next/navigation";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { FormField } from "@/components/admin/form-field";
import { ToggleField } from "@/components/admin/toggle-field";
import { SubmitButton } from "@/components/admin/submit-button";
import { updateNavLinkAction } from "../../actions";

export const instant = false;

export default async function EditNavLinkPage({ params }: { params: Promise<{ id: string }> }) {
  await connection();
  const { id } = await params;
  const link = await prisma.navLink.findUnique({ where: { id } });
  if (!link) notFound();

  const action = updateNavLinkAction.bind(null, id);

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold text-white">Edit Nav Link</h1>
      <form action={action} className="mt-8 flex flex-col gap-5">
        <FormField label="Label" name="label" defaultValue={link.label} required />
        <FormField label="Href" name="href" defaultValue={link.href} required />
        <ToggleField label="Open in new tab" name="openInNewTab" defaultChecked={link.openInNewTab} />
        <div>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
