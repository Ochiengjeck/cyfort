import Link from "next/link";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { CollectionList } from "@/components/admin/collection-list";
import { deleteInsightPostAction } from "./actions";

export const instant = false;

export default async function AdminInsightsPage() {
  await connection();
  const posts = await prisma.insightPost.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Insights</h1>
          <p className="mt-1 text-sm text-white/50">Articles and thought leadership posts.</p>
        </div>
        <Link
          href="/admin/insights/new"
          className="rounded-md bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-dark hover:opacity-90"
        >
          New Post
        </Link>
      </div>

      <div className="mt-8">
        <CollectionList
          items={posts}
          basePath="/admin/insights"
          deleteAction={deleteInsightPostAction}
          columns={[
            { header: "Title", render: (item) => item.title },
            { header: "Category", render: (item) => item.category ?? "—" },
            { header: "Published", render: (item) => (item.published ? "Yes" : "No") },
          ]}
        />
      </div>
    </div>
  );
}
