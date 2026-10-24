import Link from "next/link";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { CollectionList } from "@/components/admin/collection-list";
import { OrderEditor } from "@/components/admin/order-editor";
import { deletePromiseItemAction, reorderPromiseItemsAction } from "./actions";

export const instant = false;

export default async function AdminPromisePage() {
  await connection();
  const items = await prisma.promiseItem.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Our Promise</h1>
          <p className="mt-1 text-sm text-white/50">The four commitments shown on the homepage.</p>
        </div>
        <Link
          href="/admin/promise/new"
          className="rounded-md bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-dark hover:opacity-90"
        >
          New
        </Link>
      </div>

      <div className="mt-8">
        <OrderEditor
          items={items.map((item) => ({ id: item.id, label: item.title, order: item.order }))}
          reorderAction={reorderPromiseItemsAction}
        />
        <CollectionList
          items={items}
          basePath="/admin/promise"
          deleteAction={deletePromiseItemAction}
          columns={[
            { header: "Title", render: (item) => item.title },
            { header: "Body", render: (item) => <span className="line-clamp-2">{item.body}</span> },
          ]}
        />
      </div>
    </div>
  );
}
