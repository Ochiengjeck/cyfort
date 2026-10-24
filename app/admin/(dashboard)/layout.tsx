import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth/session";
import { AdminShell } from "@/components/admin/shell";

export const instant = false;

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();

  if (!user) {
    redirect("/admin/login");
  }

  return <AdminShell userName={`${user.name} · ${user.email}`}>{children}</AdminShell>;
}
