import { notFound } from "next/navigation";
import Link from "next/link";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { ConfirmDeleteButton } from "@/components/admin/confirm-delete-button";
import { setMessageStatusAction, deleteMessageAction } from "../actions";

export const instant = false;

export default async function AdminMessageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await connection();
  const { id } = await params;
  const message = await prisma.contactSubmission.findUnique({ where: { id } });
  if (!message) notFound();

  return (
    <div className="max-w-xl">
      <Link href="/admin/messages" className="text-sm text-white/50 hover:text-white">
        ← Back to Messages
      </Link>

      <h1 className="mt-4 text-2xl font-semibold text-white">{message.subject || "Contact form message"}</h1>
      <p className="mt-1 text-sm text-white/50">
        From {message.name} ({message.email})
        {message.company ? ` · ${message.company}` : ""}
        {message.phone ? ` · ${message.phone}` : ""}
      </p>
      <p className="text-xs text-white/40">
        {new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(message.createdAt)}
      </p>

      {message.serviceInterest || message.sector ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {message.serviceInterest ? (
            <span className="rounded-full bg-brand-gold/10 px-3 py-1 text-xs font-medium text-brand-gold">
              {message.serviceInterest}
            </span>
          ) : null}
          {message.sector ? (
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/70">
              {message.sector}
            </span>
          ) : null}
          <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/40">
            Consent: {message.consent ? "Yes" : "No"}
          </span>
        </div>
      ) : null}

      <div className="mt-6 whitespace-pre-wrap rounded-lg border border-white/10 bg-white/[0.03] p-5 text-sm text-white/80">
        {message.message}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <a
          href={`mailto:${message.email}`}
          className="rounded-md bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-dark hover:opacity-90"
        >
          Reply by Email
        </a>
        {message.status !== "read" ? (
          <form action={setMessageStatusAction.bind(null, id, "read")}>
            <button type="submit" className="text-sm text-white/60 hover:text-white">
              Mark Read
            </button>
          </form>
        ) : null}
        {message.status !== "archived" ? (
          <form action={setMessageStatusAction.bind(null, id, "archived")}>
            <button type="submit" className="text-sm text-white/60 hover:text-white">
              Archive
            </button>
          </form>
        ) : null}
        <ConfirmDeleteButton action={deleteMessageAction.bind(null, id)} />
      </div>
    </div>
  );
}
