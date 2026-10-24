import Link from "next/link";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { CollectionList } from "@/components/admin/collection-list";
import { deleteCaseStudyAction } from "./actions";

export const instant = false;

export default async function AdminCaseStudiesPage() {
  await connection();
  const items = await prisma.caseStudy.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Case Studies</h1>
          <p className="mt-1 text-sm text-white/50">Client engagements and outcomes.</p>
        </div>
        <Link
          href="/admin/case-studies/new"
          className="rounded-md bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-dark hover:opacity-90"
        >
          New Case Study
        </Link>
      </div>

      <div className="mt-8">
        <CollectionList
          items={items}
          basePath="/admin/case-studies"
          deleteAction={deleteCaseStudyAction}
          columns={[
            { header: "Title", render: (item) => item.title },
            { header: "Client", render: (item) => item.clientName },
            { header: "Published", render: (item) => (item.published ? "Yes" : "No") },
          ]}
        />
      </div>
    </div>
  );
}
