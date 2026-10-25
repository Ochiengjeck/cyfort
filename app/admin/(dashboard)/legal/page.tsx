import Link from "next/link";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { CollectionList } from "@/components/admin/collection-list";
import { deleteLegalPageAction } from "./actions";

export const instant = false;

export default async function AdminLegalPagesPage() {
  await connection();
  const pages = await prisma.legalPage.findMany({ orderBy: { title: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Legal Pages</h1>
          <p className="mt-1 text-sm text-white/50">Terms of Service, Privacy Policy, and similar pages.</p>
        </div>
        <Link
          href="/admin/legal/new"
          className="rounded-md bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-dark hover:opacity-90"
        >
          New Page
        </Link>
      </div>

      <div className="mt-8">
        <CollectionList
          items={pages}
          basePath="/admin/legal"
          deleteAction={deleteLegalPageAction}
          columns={[
            { header: "Title", render: (item) => item.title },
            { header: "Slug", render: (item) => `/${item.slug}` },
            { header: "Updated", render: (item) => item.updatedAt.toLocaleDateString() },
          ]}
        />
      </div>
    </div>
  );
}
