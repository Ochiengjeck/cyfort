import Link from "next/link";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { CollectionList } from "@/components/admin/collection-list";
import { OrderEditor } from "@/components/admin/order-editor";
import { deleteIndustryAction, reorderIndustriesAction } from "./actions";

export const instant = false;

export default async function AdminIndustriesPage() {
  await connection();
  const items = await prisma.industry.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Industries</h1>
          <p className="mt-1 text-sm text-white/50">Industries shown across the site.</p>
        </div>
        <Link
          href="/admin/industries/new"
          className="rounded-md bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-dark hover:opacity-90"
        >
          New
        </Link>
      </div>

      <div className="mt-8">
        <OrderEditor
          items={items.map((item) => ({ id: item.id, label: item.name, order: item.order }))}
          reorderAction={reorderIndustriesAction}
        />
        <CollectionList
          items={items}
          basePath="/admin/industries"
          deleteAction={deleteIndustryAction}
          columns={[{ header: "Name", render: (item) => item.name }]}
        />
      </div>
    </div>
  );
}
