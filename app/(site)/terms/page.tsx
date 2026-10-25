import { notFound } from "next/navigation";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/metadata";
import { renderMarkdown } from "@/lib/markdown";
import { Section } from "@/components/site/section";
import { PageBanner } from "@/components/site/page-banner";
import { Reveal } from "@/components/site/motion/reveal";

export const instant = false;

export async function generateMetadata() {
  return buildMetadata({ title: "Terms of Service" });
}

export default async function TermsPage() {
  await connection();
  const page = await prisma.legalPage.findUnique({ where: { slug: "terms" } });

  if (!page) notFound();

  return (
    <>
      <PageBanner
        lead="Terms of"
        emphasis="Service"
        description="The terms that govern your use of our website and services."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]}
      />

      <Section variant="paperAlt" className="px-6 py-20">
        <Reveal className="mx-auto max-w-3xl">
          <div className="prose-cyfort" dangerouslySetInnerHTML={{ __html: renderMarkdown(page.body) }} />
        </Reveal>
      </Section>
    </>
  );
}
