"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { jobPostingSchema } from "@/lib/validation/jobPosting";
import { slugify } from "@/lib/slugify";

function parse(formData: FormData) {
  const title = String(formData.get("title") ?? "");
  const rawSlug = String(formData.get("slug") ?? "");
  const closesAtRaw = String(formData.get("closesAt") ?? "");

  return {
    ...jobPostingSchema.parse({
      title,
      slug: slugify(rawSlug || title),
      department: formData.get("department") || undefined,
      location: formData.get("location") || undefined,
      employmentType: formData.get("employmentType") || undefined,
      summary: formData.get("summary"),
      description: formData.get("description"),
      coverMediaId: formData.get("coverMediaId") || undefined,
      responsibilities: formData.get("responsibilities") || undefined,
      requirements: formData.get("requirements") || undefined,
      benefits: formData.get("benefits") || undefined,
      salaryRange: formData.get("salaryRange") || undefined,
      applyEmail: formData.get("applyEmail") || undefined,
      published: formData.get("published") === "on",
    }),
    closesAt: closesAtRaw ? new Date(closesAtRaw) : null,
  };
}

function refresh(slug?: string) {
  revalidatePath("/admin/careers");
  revalidatePath("/careers");
  if (slug) revalidatePath(`/careers/${slug}`);
}

export async function createJobPostingAction(formData: FormData) {
  const data = parse(formData);
  await prisma.jobPosting.create({ data });
  refresh(data.slug);
  redirect("/admin/careers");
}

export async function updateJobPostingAction(id: string, formData: FormData) {
  const data = parse(formData);
  await prisma.jobPosting.update({ where: { id }, data });
  refresh(data.slug);
  redirect("/admin/careers");
}

export async function deleteJobPostingAction(id: string) {
  await prisma.jobPosting.delete({ where: { id } });
  refresh();
}
