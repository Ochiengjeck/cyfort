import Link from "next/link";
import Image from "next/image";
import { SidebarNav } from "./sidebar-nav";
import { logoutAction } from "@/app/admin/login/actions";

type AdminShellProps = {
  userName: string;
  children: React.ReactNode;
};

export function AdminShell({ userName, children }: AdminShellProps) {
  return (
    <div className="flex min-h-screen bg-brand-dark text-white">
      <aside className="flex w-64 shrink-0 flex-col border-r border-white/10 px-4 py-6">
        <Link href="/admin" className="mb-8 flex items-center gap-2 px-2">
          <Image src="/images/brand/cyfort-emblem.png" alt="" width={64} height={64} className="h-8 w-8" />
          <div>
            <p className="text-sm font-semibold leading-tight">CYFORT</p>
            <p className="text-[11px] uppercase tracking-[0.15em] text-white/40">Admin</p>
          </div>
        </Link>
        <div className="flex-1 overflow-y-auto">
          <SidebarNav />
        </div>
        <div className="mt-6 border-t border-white/10 pt-4">
          <p className="truncate px-3 text-xs text-white/50">{userName}</p>
          <form action={logoutAction}>
            <button
              type="submit"
              className="mt-2 w-full rounded-md px-3 py-2 text-left text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-8 py-10">{children}</div>
      </main>
    </div>
  );
}
