import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { WhatsAppFloatButton } from "./whatsapp-float-button";

export async function WhatsAppFloat() {
  await connection();
  const settings = await prisma.siteSettings.findFirst();

  if (!settings?.whatsappNumber) return null;

  return <WhatsAppFloatButton href={buildWhatsAppLink(settings.whatsappNumber, settings.whatsappMessage ?? undefined)} />;
}
