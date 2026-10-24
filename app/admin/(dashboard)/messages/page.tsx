import Link from "next/link";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { ConfirmDeleteButton } from "@/components/admin/confirm-delete-button";
import { setMessageStatusAction, deleteMessageAction } from "./actions";

export const instant = false;

const STATUS_LABEL: Record<string, string> = {
  new: "New",
  read: "Read",
  archived: "Archived",
};

export default async function AdminMessagesPage() {
  await connection();
  const messages = await prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">Messages</h1>
      <p className="mt-1 text-sm text-white/50">Submissions from the public contact form.</p>

      {messages.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-white/15 px-6 py-10 text-center text-sm text-white/40">
          No messages yet.
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-3">
          {messages.map((message) => (
            <div key={message.id} className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Link href={`/admin/messages/${message.id}`} className="font-medium text-white hover:text-brand-gold">
                    {message.name}
                  </Link>
                  <p className="text-xs text-white/40">
                    {message.email} · {new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(message.createdAt)}
                  </p>
                  {message.subject ? <p className="mt-1 text-sm text-white/70">{message.subject}</p> : null}
                  <p className="mt-2 line-clamp-2 text-sm text-white/50">{message.message}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                    message.status === "new"
                      ? "bg-brand-gold/15 text-brand-gold"
                      : "bg-white/10 text-white/50"
                  }`}
                >
                  {STATUS_LABEL[message.status] ?? message.status}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-4">
                {message.status !== "read" ? (
                  <form action={setMessageStatusAction.bind(null, message.id, "read")}>
                    <button type="submit" className="text-xs text-white/60 hover:text-white">
                      Mark Read
                    </button>
                  </form>
                ) : null}
                {message.status !== "archived" ? (
                  <form action={setMessageStatusAction.bind(null, message.id, "archived")}>
                    <button type="submit" className="text-xs text-white/60 hover:text-white">
                      Archive
                    </button>
                  </form>
                ) : null}
                <ConfirmDeleteButton action={deleteMessageAction.bind(null, message.id)} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
