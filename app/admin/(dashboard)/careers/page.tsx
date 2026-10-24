import Link from "next/link";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { CollectionList } from "@/components/admin/collection-list";
import { deleteJobPostingAction } from "./actions";

export const instant = false;

export default async function AdminCareersPage() {
  await connection();
  const jobs = await prisma.jobPosting.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Careers</h1>
          <p className="mt-1 text-sm text-white/50">Open roles listed on the site.</p>
        </div>
        <Link
          href="/admin/careers/new"
          className="rounded-md bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-dark hover:opacity-90"
        >
          New Role
        </Link>
      </div>

      <div className="mt-8">
        <CollectionList
          items={jobs}
          basePath="/admin/careers"
          deleteAction={deleteJobPostingAction}
          columns={[
            { header: "Title", render: (item) => item.title },
            { header: "Department", render: (item) => item.department ?? "—" },
            { header: "Published", render: (item) => (item.published ? "Yes" : "No") },
          ]}
        />
      </div>
    </div>
  );
}
