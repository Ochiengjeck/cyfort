import type { Metadata } from "next";

// Keeps the entire /admin/* tree (login + dashboard) out of search results —
// defense-in-depth alongside robots.ts disallowing /admin for crawlers that
// respect it.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
