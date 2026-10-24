import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE_NAME } from "@/lib/auth/constants";
import { verifySessionToken } from "@/lib/auth/token";

export async function getSessionUser() {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const session = await verifySessionToken(token);
  if (!session) return null;

  const user = await prisma.adminUser.findUnique({ where: { id: session.userId } });
  return user;
}

export async function requireAdmin() {
  const user = await getSessionUser();
  if (!user) {
    throw new Error("Not authenticated.");
  }
  return user;
}
