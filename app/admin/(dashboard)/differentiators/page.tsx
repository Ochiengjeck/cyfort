import Link from "next/link";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { CollectionList } from "@/components/admin/collection-list";
import { OrderEditor } from "@/components/admin/order-editor";
import { deleteDifferentiatorAction, reorderDifferentiatorsAction } from "./actions";

export const instant = false;

export default async function AdminDifferentiatorsPage() {
  await connection();
  const items = await prisma.differentiator.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Differentiators</h1>
          <p className="mt-1 text-sm text-white/50">&quot;What Makes CYFORT Different&quot; section.</p>
        </div>
        <Link
          href="/admin/differentiators/new"
          className="rounded-md bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-dark hover:opacity-90"
        >
          New
        </Link>
      </div>

      <div className="mt-8">
        <OrderEditor
          items={items.map((item) => ({ id: item.id, label: item.title, order: item.order }))}
          reorderAction={reorderDifferentiatorsAction}
        />
        <CollectionList
          items={items}
          basePath="/admin/differentiators"
          deleteAction={deleteDifferentiatorAction}
          columns={[
            { header: "Title", render: (item) => item.title },
            { header: "Body", render: (item) => <span className="line-clamp-2">{item.body}</span> },
          ]}
        />
      </div>
    </div>
  );
}
