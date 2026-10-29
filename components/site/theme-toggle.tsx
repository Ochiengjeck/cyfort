"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { setThemeAction } from "@/lib/theme/actions";
import type { Theme } from "@/lib/theme/constants";

type ThemeToggleProps = {
  theme: Theme;
  className?: string;
};

/**
 * Icon shows the mode a click will switch *to* (standard convention) — a
 * moon while in light mode (click to go dark), a sun while in dark mode
 * (click to go light). Persists via a cookie (lib/theme/actions.ts) read
 * server-side on the next render, then `router.refresh()` re-renders the
 * current route with the new theme — no full page reload.
 */
export function ThemeToggle({ theme, className = "" }: ThemeToggleProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    startTransition(async () => {
      await setThemeAction(next);
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={isPending}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-on-dark/80 transition-colors hover:border-brand-gold hover:text-brand-gold disabled:opacity-60 ${className}`}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
    </button>
  );
}
