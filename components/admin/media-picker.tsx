import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

type MediaPickerProps = {
  label: string;
  name: string;
  defaultValue?: string | null;
};

export async function MediaPicker({ label, name, defaultValue }: MediaPickerProps) {
  const media = defaultValue ? await prisma.media.findUnique({ where: { id: defaultValue } }) : null;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={name} className="text-xs font-medium uppercase tracking-wider text-white/50">
          {label}
        </label>
        <Link href="/admin/media" target="_blank" className="text-xs text-brand-gold hover:underline">
          Open Media Library →
        </Link>
      </div>
      <div className="flex items-center gap-3">
        {media ? (
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-black/20">
            <Image src={media.url} alt={media.alt ?? media.filename} fill className="object-cover" />
          </div>
        ) : null}
        <input
          id={name}
          name={name}
          defaultValue={defaultValue ?? ""}
          placeholder="Paste a Media ID from the library"
          className="flex-1 rounded-md border border-white/15 bg-white/5 px-3.5 py-2.5 font-mono text-xs text-white outline-none transition-colors focus:border-brand-gold"
        />
      </div>
    </div>
  );
}
