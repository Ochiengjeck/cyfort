import Link from "next/link";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { CollectionList } from "@/components/admin/collection-list";
import { OrderEditor } from "@/components/admin/order-editor";
import { deleteNavLinkAction, reorderNavLinksAction } from "./actions";

export const instant = false;

export default async function AdminNavLinksPage() {
  await connection();
  const navLinks = await prisma.navLink.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Navigation</h1>
          <p className="mt-1 text-sm text-white/50">Links shown in the header and footer.</p>
        </div>
        <Link
          href="/admin/settings/nav/new"
          className="rounded-md bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-dark hover:opacity-90"
        >
          New Link
        </Link>
      </div>

      <div className="mt-8">
        <OrderEditor
          items={navLinks.map((link) => ({ id: link.id, label: link.label, order: link.order }))}
          reorderAction={reorderNavLinksAction}
        />
        <CollectionList
          items={navLinks}
          basePath="/admin/settings/nav"
          deleteAction={deleteNavLinkAction}
          columns={[
            { header: "Label", render: (item) => item.label },
            { header: "Href", render: (item) => item.href },
            { header: "New Tab", render: (item) => (item.openInNewTab ? "Yes" : "No") },
          ]}
        />
      </div>
    </div>
  );
}
