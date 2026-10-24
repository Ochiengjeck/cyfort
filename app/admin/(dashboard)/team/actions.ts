"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { teamMemberSchema } from "@/lib/validation/teamMember";

function parse(formData: FormData) {
  return teamMemberSchema.parse({
    name: formData.get("name"),
    role: formData.get("role"),
    bio: formData.get("bio") || undefined,
    photoMediaId: formData.get("photoMediaId") || undefined,
    linkedinUrl: formData.get("linkedinUrl") || undefined,
    email: formData.get("email") || undefined,
    published: formData.get("published") === "on",
  });
}

function refresh() {
  revalidatePath("/admin/team");
  revalidatePath("/team");
}

export async function createTeamMemberAction(formData: FormData) {
  const data = parse(formData);
  const count = await prisma.teamMember.count();
  await prisma.teamMember.create({ data: { ...data, order: count } });
  refresh();
  redirect("/admin/team");
}

export async function updateTeamMemberAction(id: string, formData: FormData) {
  const data = parse(formData);
  await prisma.teamMember.update({ where: { id }, data });
  refresh();
  redirect("/admin/team");
}

export async function deleteTeamMemberAction(id: string) {
  await prisma.teamMember.delete({ where: { id } });
  refresh();
}

export async function reorderTeamMembersAction(formData: FormData) {
  const updates: Array<Promise<unknown>> = [];
  for (const [key, value] of formData.entries()) {
    if (!key.startsWith("order-")) continue;
    const id = key.slice("order-".length);
    const order = Number(value);
    if (Number.isFinite(order)) {
      updates.push(prisma.teamMember.update({ where: { id }, data: { order } }));
    }
  }
  await Promise.all(updates);
  refresh();
}
