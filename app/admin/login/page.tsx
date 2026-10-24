import type { Metadata } from "next";
import Image from "next/image";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Admin Login | CyFort Technologies",
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-dark px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <Image src="/images/brand/cyfort-emblem.png" alt="CyFort" width={112} height={112} className="h-14 w-14" />
          <div>
            <p className="text-sm font-semibold tracking-wide text-white">CYFORT</p>
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">Admin Console</p>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
