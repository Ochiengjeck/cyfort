import Link from "next/link";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { CollectionList } from "@/components/admin/collection-list";
import { OrderEditor } from "@/components/admin/order-editor";
import { deleteServiceAction, reorderServicesAction } from "./actions";

export const instant = false;

export default async function AdminServicesPage() {
  await connection();
  const services = await prisma.service.findMany({
    orderBy: { order: "asc" },
    include: { items: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Services</h1>
          <p className="mt-1 text-sm text-white/50">The 9-category service portfolio.</p>
        </div>
        <Link
          href="/admin/services/new"
          className="rounded-md bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-dark hover:opacity-90"
        >
          New Service
        </Link>
      </div>

      <div className="mt-8">
        <OrderEditor
          items={services.map((s) => ({ id: s.id, label: s.name, order: s.order }))}
          reorderAction={reorderServicesAction}
        />
        <CollectionList
          items={services}
          basePath="/admin/services"
          deleteAction={deleteServiceAction}
          columns={[
            { header: "Name", render: (item) => item.name },
            { header: "Slug", render: (item) => item.slug },
            { header: "Sub-services", render: (item) => item.items.length },
          ]}
        />
      </div>
    </div>
  );
}
