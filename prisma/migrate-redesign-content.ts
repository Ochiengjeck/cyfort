import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString =
  process.env.DATABASE_URL ?? process.env.PRISMA_DATABASE_URL ?? process.env.POSTGRES_URL ?? "";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

/**
 * One-off, idempotent content migration for the redesign — fixes up rows
 * that already existed before the schema migration (prisma/seed.ts's
 * seed functions only insert when a table is empty, so they never touch
 * live data). Safe to re-run: every step is a targeted, guarded update.
 */
async function fixSiteSettingsColors() {
  const settings = await prisma.siteSettings.findFirst();
  if (!settings) return;

  // Only touch rows still on the old broken defaults — never clobber a
  // deliberate admin color choice.
  if (settings.colorPaper === "#141414" && settings.colorPaperAlt === "#0A0A0B") {
    await prisma.siteSettings.update({
      where: { id: settings.id },
      data: { colorPaper: "#F7F6F2", colorPaperAlt: "#EFEDE6" },
    });
    console.log("SiteSettings: updated colorPaper/colorPaperAlt to light defaults.");
  } else {
    console.log("SiteSettings: colors already customized, left untouched.");
  }
}

async function fixHomeHeroCta() {
  const hero = await prisma.homeHero.findFirst();
  if (!hero) return;

  await prisma.homeHero.update({
    where: { id: hero.id },
    data: {
      headlineEmphasis: "Digital Growth Across Africa",
      primaryCtaLabel: "Book a Data Protection Health Check",
      primaryCtaHref: "/contact",
      secondaryCtaLabel: "Explore our services",
      secondaryCtaHref: "/services",
    },
  });
  console.log("HomeHero: updated headline + CTAs.");
}

async function fixNavLinks() {
  const deleted = await prisma.navLink.deleteMany({
    where: { href: { in: ["/team", "/case-studies", "/careers"] } },
  });
  console.log(`NavLink: removed ${deleted.count} Team/Case Studies/Careers link(s).`);

  const insights = await prisma.navLink.findFirst({ where: { href: "/insights" } });
  if (insights) {
    await prisma.navLink.update({ where: { id: insights.id }, data: { label: "Blog", href: "/blog" } });
    console.log("NavLink: relabeled Insights -> Blog (/insights -> /blog).");
  } else {
    const blog = await prisma.navLink.findFirst({ where: { href: "/blog" } });
    if (!blog) {
      const count = await prisma.navLink.count();
      await prisma.navLink.create({ data: { label: "Blog", href: "/blog", order: count } });
      console.log("NavLink: created missing Blog link.");
    }
  }
}

type ServiceRename = {
  oldSlug: string;
  newSlug: string;
  name: string;
  summary: string;
  pillar: "ADVISE" | "SECURE_ASSURE" | "BUILD_RUN";
  ctaLabel: string;
  ctaHref: string;
  builtForTags: string;
  triggerText: string;
};

const FEATURED_SERVICE_RENAMES: ServiceRename[] = [
  {
    oldSlug: "digital-governance-compliance",
    newSlug: "data-protection-compliance",
    name: "Data Protection Compliance",
    summary:
      "The ODPC now runs compliance audits and issues penalty and compensation orders. We get you registered, compliant and able to prove it.",
    pillar: "SECURE_ASSURE",
    ctaLabel: "Book a Data Protection Health Check",
    ctaHref: "/contact",
    builtForTags: ["Banks & microfinance", "SACCOs", "Hospitals & clinics", "Digital lenders", "NGOs", "Schools"].join("\n"),
    triggerText: "An ODPC complaint, audit or registration deadline",
  },
  {
    oldSlug: "cybersecurity-consulting",
    newSlug: "cybersecurity-as-a-service",
    name: "Cybersecurity as a Service",
    summary:
      "A complete security function without building one in-house. We lead your security programme, run the day-to-day controls and keep your board informed.",
    pillar: "SECURE_ASSURE",
    ctaLabel: "Request a cyber assessment",
    ctaHref: "/contact",
    builtForTags: ["Banks & microfinance", "SACCOs", "Fintechs", "Mid-size companies", "INGO country offices"].join("\n"),
    triggerText: "A CBK or SASRA cybersecurity directive",
  },
  {
    oldSlug: "managed-it-services",
    newSlug: "outsourced-it-technology-leadership",
    name: "Outsourced IT & Technology Leadership",
    summary:
      "Senior IT direction when you need it, or your entire IT function run for you. Either way, your systems are secure, supported and aligned to the business.",
    pillar: "BUILD_RUN",
    ctaLabel: "Talk to us about outsourcing IT",
    ctaHref: "/contact",
    builtForTags: ["Microfinance institutions", "SMEs", "Clinics", "NGOs", "Professional firms"].join("\n"),
    triggerText: "No in-house IT team, or one stretched too thin",
  },
  {
    oldSlug: "technology-risk-assurance",
    newSlug: "it-audit-technology-assurance",
    name: "IT Audit & Technology Assurance",
    summary:
      "Independent assurance over the systems your numbers depend on, for audit committees, ERP owners and audit firms that need specialist ITGC capacity.",
    pillar: "SECURE_ASSURE",
    ctaLabel: "Request an ITGC review",
    ctaHref: "/contact",
    builtForTags: ["Banks & microfinance", "Audit committees", "Audit firms", "ERP go-lives", "Donor-funded programmes"].join(
      "\n",
    ),
    triggerText: "A new ERP or a qualified audit finding",
  },
];

const PILLAR_BY_SLUG: Record<string, "ADVISE" | "SECURE_ASSURE" | "BUILD_RUN"> = {
  "technology-advisory": "ADVISE",
  "enterprise-technology-solutions": "ADVISE",
  "cloud-digital-infrastructure": "SECURE_ASSURE",
  "systems-software-development": "BUILD_RUN",
  "domain-web-hosting-services": "BUILD_RUN",
};

async function fixServices() {
  const services = await prisma.service.findMany();
  const bySlug = new Map(services.map((s) => [s.slug, s]));

  for (const rename of FEATURED_SERVICE_RENAMES) {
    const existing = bySlug.get(rename.oldSlug) ?? bySlug.get(rename.newSlug);
    if (!existing) {
      console.log(`Service: no row found for ${rename.oldSlug}/${rename.newSlug}, skipped.`);
      continue;
    }
    await prisma.service.update({
      where: { id: existing.id },
      data: {
        slug: rename.newSlug,
        name: rename.name,
        summary: rename.summary,
        pillar: rename.pillar,
        featured: true,
        ctaLabel: rename.ctaLabel,
        ctaHref: rename.ctaHref,
        builtForTags: rename.builtForTags,
        triggerText: rename.triggerText,
      },
    });
    console.log(`Service: ${existing.slug} -> ${rename.newSlug} ("${rename.name}"), featured.`);
  }

  for (const [slug, pillar] of Object.entries(PILLAR_BY_SLUG)) {
    const existing = bySlug.get(slug);
    if (!existing) continue;
    if (existing.pillar !== pillar) {
      await prisma.service.update({ where: { id: existing.id }, data: { pillar } });
      console.log(`Service: ${slug} pillar -> ${pillar}.`);
    }
  }
}

type IndustryFocus = {
  oldName: string;
  newName: string;
  drivingText: string;
  startText: string;
  startServiceSlug: string;
};

const FOCUS_INDUSTRIES: IndustryFocus[] = [
  {
    oldName: "Financial Services",
    newName: "Banks, Microfinance & SACCOs",
    drivingText:
      "CBK cybersecurity guidance for banks and microfinance institutions, SASRA directives for SACCOs, and officials carrying personal liability for losses.",
    startText: "A cyber maturity assessment, then Cybersecurity as a Service with board reporting.",
    startServiceSlug: "cybersecurity-as-a-service",
  },
  {
    oldName: "Government",
    newName: "Government & Public Sector",
    drivingText: "Citizen data, system modernisation, and data-protection checks being built into public-sector audits.",
    startText: "IT audit and data protection compliance review, with DR and continuity planning.",
    startServiceSlug: "it-audit-technology-assurance",
  },
  {
    oldName: "Healthcare",
    newName: "Healthcare",
    drivingText:
      "Patient records are sensitive personal data. Hospitals face complaints, compensation orders and growing use of digital health systems.",
    startText: "Data Protection Health Check, then an outsourced DPO and HMIS access review.",
    startServiceSlug: "data-protection-compliance",
  },
  {
    oldName: "NGOs & Development Partners",
    newName: "NGOs & Development Partners",
    drivingText:
      "Donor and UN due diligence now asks about data protection, beneficiary data and cyber controls, often across several countries.",
    startText: "Data protection and cyber policy pack, mapped to the donor's checklist.",
    startServiceSlug: "data-protection-compliance",
  },
];

async function fixIndustries() {
  const [industries, services] = await Promise.all([prisma.industry.findMany(), prisma.service.findMany()]);
  const industryByName = new Map(industries.map((i) => [i.name, i]));
  const serviceBySlug = new Map(services.map((s) => [s.slug, s]));

  for (const focus of FOCUS_INDUSTRIES) {
    const existing = industryByName.get(focus.oldName) ?? industryByName.get(focus.newName);
    if (!existing) {
      console.log(`Industry: no row found for ${focus.oldName}/${focus.newName}, skipped.`);
      continue;
    }
    const startService = serviceBySlug.get(focus.startServiceSlug);
    await prisma.industry.update({
      where: { id: existing.id },
      data: {
        name: focus.newName,
        featured: true,
        drivingText: focus.drivingText,
        startText: focus.startText,
        startServiceId: startService?.id,
      },
    });
    console.log(`Industry: ${existing.name} -> ${focus.newName}, featured.`);
  }
}

async function main() {
  await fixSiteSettingsColors();
  await fixHomeHeroCta();
  await fixNavLinks();
  await fixServices();
  await fixIndustries();
  console.log("Redesign content migration complete.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
