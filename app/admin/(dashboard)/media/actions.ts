"use server";

import { revalidatePath } from "next/cache";
import { saveUploadedFile, deleteMedia } from "@/lib/media";

export async function uploadMediaAction(formData: FormData) {
  const file = formData.get("file");
  const alt = String(formData.get("alt") ?? "");

  if (!(file instanceof File) || file.size === 0) {
    throw new Error("Please choose a file to upload.");
  }

  await saveUploadedFile(file, alt);
  revalidatePath("/admin/media");
}

export async function deleteMediaAction(id: string) {
  await deleteMedia(id);
  revalidatePath("/admin/media");
}
