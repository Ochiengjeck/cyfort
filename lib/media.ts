import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

function sanitizeFilename(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9.\-]+/g, "-").replace(/-+/g, "-");
}

export async function saveUploadedFile(file: File, alt?: string) {
  await mkdir(UPLOADS_DIR, { recursive: true });

  const id = randomUUID();
  const filename = sanitizeFilename(file.name || "upload");
  const storedName = `${id}-${filename}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  await writeFile(path.join(UPLOADS_DIR, storedName), buffer);

  return prisma.media.create({
    data: {
      url: `/uploads/${storedName}`,
      filename,
      alt: alt || null,
      mimeType: file.type || "application/octet-stream",
      size: buffer.byteLength,
    },
  });
}

export async function resolveMediaUrl(mediaId: string | null | undefined): Promise<string | null> {
  if (!mediaId) return null;
  const media = await prisma.media.findUnique({ where: { id: mediaId } });
  return media?.url ?? null;
}

export async function deleteMedia(id: string) {
  const media = await prisma.media.findUnique({ where: { id } });
  if (!media) return;

  const filePath = path.join(process.cwd(), "public", media.url.replace(/^\//, ""));
  try {
    await unlink(filePath);
  } catch {
    // file already gone, ignore
  }

  await prisma.media.delete({ where: { id } });
}
