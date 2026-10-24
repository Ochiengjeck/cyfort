import { MotionConfig } from "framer-motion";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";

// The header/footer read live SiteSettings/NavLink data on every request —
// opt this whole segment out of Cache Components' static-shell validation
// rather than wrapping each read in Suspense, matching the documented
// quick-migration pattern (see app/layout.tsx for the full rationale).
export const instant = false;

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    // reducedMotion="user" makes every framer-motion animation site-wide
    // (Reveal, StaggerGrid, MobileNav) honor the OS prefers-reduced-motion
    // setting automatically — transforms are disabled, opacity still fades.
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
