import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { ConfirmDeleteButton } from "@/components/admin/confirm-delete-button";
import { deleteNewsletterSubscriberAction } from "./actions";

export const instant = false;

export default async function AdminNewsletterPage() {
  await connection();
  const subscribers = await prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold text-white">Newsletter</h1>
        <p className="mt-1 text-sm text-white/50">
          {subscribers.length} subscriber{subscribers.length === 1 ? "" : "s"} from the site footer signup.
        </p>
      </div>

      <div className="mt-8">
        {subscribers.length === 0 ? (
          <div className="rounded-lg border border-dashed border-white/15 px-6 py-10 text-center text-sm text-white/40">
            No subscribers yet.
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-white/10">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03] text-left text-xs uppercase tracking-wider text-white/40">
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Subscribed</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-3 align-top text-white/80">{subscriber.email}</td>
                    <td className="px-4 py-3 align-top text-white/80">
                      {subscriber.createdAt.toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <ConfirmDeleteButton
                        action={deleteNewsletterSubscriberAction.bind(null, subscriber.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
