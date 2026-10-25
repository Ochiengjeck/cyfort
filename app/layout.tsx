import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import { ThemeStyle } from "@/components/site/theme-style";
import { SITE_URL, SITE_NAME } from "@/lib/metadata";
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

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const DEFAULT_DESCRIPTION = "Securing Digital Growth Across Africa.";
const DEFAULT_OG_IMAGE = "/images/generated/banner-shield.jpg";

// Static root metadata — Cache Components can't validate a DB-backed
// generateMetadata at the root layout (there's no page-level `instant`
// escape hatch for metadata specifically). Each page's own generateMetadata
// (lib/metadata.ts#buildMetadata) reads the live SiteSettings row for its
// title/description/OG image; these are the site-wide fallbacks every page
// inherits and overrides.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeStyle />
        {children}
      </body>
    </html>
  );
}
