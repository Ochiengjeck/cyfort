import Image from "next/image";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { ConfirmDeleteButton } from "@/components/admin/confirm-delete-button";
import { SubmitButton } from "@/components/admin/submit-button";
import { uploadMediaAction, deleteMediaAction } from "./actions";

export const instant = false;

export default async function AdminMediaPage() {
  await connection();
  const media = await prisma.media.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">Media Library</h1>
      <p className="mt-1 text-sm text-white/50">
        Images are stored locally under <code className="font-mono">public/uploads</code> — this
        will need to move to cloud storage before deploying to a serverless host.
      </p>

      <form
        action={uploadMediaAction}
        encType="multipart/form-data"
        className="mt-8 flex flex-wrap items-end gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-5"
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="file" className="text-xs font-medium uppercase tracking-wider text-white/50">
            File
          </label>
          <input
            id="file"
            name="file"
            type="file"
            accept="image/*"
            required
            className="text-sm text-white/80 file:mr-3 file:rounded-md file:border-0 file:bg-brand-gold file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-brand-dark"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="alt" className="text-xs font-medium uppercase tracking-wider text-white/50">
            Alt text
          </label>
          <input
            id="alt"
            name="alt"
            className="rounded-md border border-white/15 bg-white/5 px-3.5 py-2 text-sm text-white outline-none focus:border-brand-gold"
          />
        </div>
        <SubmitButton label="Upload" pendingLabel="Uploading…" />
      </form>

      {media.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-white/15 px-6 py-10 text-center text-sm text-white/40">
          No media uploaded yet.
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {media.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">
              <div className="relative aspect-square bg-black/20">
                <Image src={item.url} alt={item.alt ?? item.filename} fill className="object-cover" />
              </div>
              <div className="p-3">
                <p className="truncate text-xs text-white/70">{item.filename}</p>
                <p className="mt-1 select-all truncate font-mono text-[10px] text-white/40">{item.id}</p>
                <div className="mt-2">
                  <ConfirmDeleteButton action={deleteMediaAction.bind(null, item.id)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
