import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeStyle } from "@/components/site/theme-style";
import "./globals.css";

export const instant = false;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_NAME = "CyFort Technologies Limited";

// Static root metadata — Cache Components can't validate a DB-backed
// generateMetadata at the root layout (there's no page-level `instant`
// escape hatch for metadata specifically). Each page's own generateMetadata
// (lib/metadata.ts#buildMetadata) reads the live SiteSettings row for its
// title/description; this template suffix is the one static fallback.
export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: "Securing Digital Growth Across Africa.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeStyle />
        {children}
      </body>
    </html>
  );
}
