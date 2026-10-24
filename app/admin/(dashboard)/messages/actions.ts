"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function setMessageStatusAction(id: string, status: "new" | "read" | "archived") {
  await prisma.contactSubmission.update({ where: { id }, data: { status } });
  revalidatePath("/admin/messages");
}

export async function deleteMessageAction(id: string) {
  await prisma.contactSubmission.delete({ where: { id } });
  revalidatePath("/admin/messages");
}
