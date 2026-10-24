import Link from "next/link";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { CollectionList } from "@/components/admin/collection-list";
import { OrderEditor } from "@/components/admin/order-editor";
import { deleteTeamMemberAction, reorderTeamMembersAction } from "./actions";

export const instant = false;

export default async function AdminTeamPage() {
  await connection();
  const team = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Team</h1>
          <p className="mt-1 text-sm text-white/50">Leadership and team profiles.</p>
        </div>
        <Link
          href="/admin/team/new"
          className="rounded-md bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-dark hover:opacity-90"
        >
          New Member
        </Link>
      </div>

      <div className="mt-8">
        <OrderEditor
          items={team.map((m) => ({ id: m.id, label: m.name, order: m.order }))}
          reorderAction={reorderTeamMembersAction}
        />
        <CollectionList
          items={team}
          basePath="/admin/team"
          deleteAction={deleteTeamMemberAction}
          columns={[
            { header: "Name", render: (item) => item.name },
            { header: "Role", render: (item) => item.role },
            { header: "Published", render: (item) => (item.published ? "Yes" : "No") },
          ]}
        />
      </div>
    </div>
  );
}
