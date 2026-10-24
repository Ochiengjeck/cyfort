import "dotenv/config";
import { statSync } from "node:fs";
import path from "node:path";
import bcrypt from "bcryptjs";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! }),
});

async function seedAdminUser() {
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD environment variables are required to seed the admin user.",
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.adminUser.upsert({
    where: { email },
    update: {},
    create: { email, passwordHash, name: "CyFort Admin" },
  });
}

async function seedSiteSettings() {
  const existing = await prisma.siteSettings.findFirst();
  if (existing) return;

  await prisma.siteSettings.create({
    data: {
      siteName: "CyFort Technologies Limited",
      shortName: "CYFORT",
      tagline: "Securing Digital Growth Across Africa",
      categoryLine: "TECHNOLOGY · ADVISORY · CYBERSECURITY",
      metaDescription:
        "CyFort Technologies is a technology advisory and cybersecurity consulting firm helping organizations across Africa build secure, resilient, and future-ready digital environments.",
      contactEmail: "info@cyfort.africa",
      contactPhone: "+254 7__ ___ ___",
    },
  });
}

async function seedNavLinks() {
  const existing = await prisma.navLink.count();
  if (existing > 0) return;

  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Industries", href: "/industries" },
    { label: "Team", href: "/team" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Insights", href: "/insights" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ];

  await prisma.navLink.createMany({
    data: links.map((link, index) => ({ ...link, order: index })),
  });
}

async function seedHomeHero() {
  const existing = await prisma.homeHero.findFirst();
  if (existing) return;

  await prisma.homeHero.create({
    data: {
      eyebrow: "TECHNOLOGY · ADVISORY · CYBERSECURITY",
      headlineLead: "Securing",
      headlineEmphasis: "Africa's Digital Future",
      primaryCtaLabel: "Explore Our Services",
      primaryCtaHref: "/services",
      secondaryCtaLabel: "Discover Our Impact",
      secondaryCtaHref: "/case-studies",
    },
  });
}

async function seedAboutContent() {
  const existing = await prisma.aboutContent.findFirst();
  if (existing) return;

  await prisma.aboutContent.create({
    data: {
      whoWeAreBody: [
        "Technology has become the backbone of every modern organization. It powers operations, enables innovation, drives customer engagement, and creates new opportunities for growth. Yet as organizations become increasingly digital, they also face growing challenges - from sophisticated cyber threats and evolving regulatory requirements to complex technology investments and operational risks.",
        "CyFort Technologies was established to help organizations navigate this changing landscape with confidence.",
        "We are a technology advisory and cybersecurity consulting firm that partners with organizations to build secure, resilient, and future-ready digital environments. Our approach extends beyond technology implementation - we work with leadership teams to ensure technology aligns with business strategy, strengthens governance, protects critical information, and enables sustainable growth.",
        "Whether supporting a healthcare provider protecting patient information, a financial institution strengthening cyber resilience, a humanitarian organization managing donor-funded systems, or a growing enterprise embarking on digital transformation, we provide practical, business-focused solutions that create lasting value.",
      ].join("\n\n"),
      pullQuote:
        "At CYFORT, we believe cybersecurity is no longer just an IT function — it is a business imperative.",
      vision:
        "To become Africa's most trusted technology advisory and cybersecurity consulting firm, empowering organizations to innovate securely and grow with confidence.",
      mission:
        "To help organizations harness technology safely, strategically, and sustainably — delivering trusted advisory, cybersecurity, digital transformation, and governance solutions that strengthen resilience and unlock business value.",
      approachIntro: [
        "Technology should never become a source of uncertainty. Organizations should be able to embrace innovation knowing their systems, information, people, and operations are protected.",
        "Our role is to make technology a strategic advantage - not an unmanaged risk.",
      ].join("\n\n"),
      approachBody: [
        "Before recommending solutions, we seek to understand the organization's objectives, risks, operational environment, regulatory obligations, and long-term strategy. Only then do we design solutions that improve security, strengthen governance, optimize technology investments, and support organizational growth.",
        "This business-first philosophy enables us to deliver practical recommendations that are aligned with executive priorities - not just technical requirements.",
      ].join("\n\n"),
      comparisonLeftLabel: "Most Firms",
      comparisonLeftText: "Begin with technology",
      comparisonRightLabel: "We",
      comparisonRightText: "Begin With The Business",
      closingEyebrow: "LOOKING AHEAD",
      closingHeading: "Securing Tomorrow's Digital Africa",
      closingBody: [
        "Africa is entering a new era of digital transformation driven by cloud computing, artificial intelligence, automation, fintech, digital health, and data-driven decision-making. With these opportunities come new responsibilities.",
        "Organizations need trusted advisors who understand not only technology, but also governance, business strategy, operational risk, and organizational resilience. CyFort Technologies exists to be that trusted partner.",
      ].join("\n\n"),
      closingQuote:
        "Together, we help organizations secure today, prepare for tomorrow, and build confidence in a digital future.",
    },
  });
}

async function seedDifferentiators() {
  const existing = await prisma.differentiator.count();
  if (existing > 0) return;

  const items = [
    {
      title: "Business-Led Technology Advisory",
      body: "Technology decisions should support business outcomes. Our multidisciplinary perspective bridges executive leadership, finance, operations, risk management, and technology teams.",
    },
    {
      // The source profile document repeats item 1's body verbatim here,
      // almost certainly a copy-paste error — written distinctly instead.
      title: "Cybersecurity Beyond Compliance",
      body: "Security must serve the business, not just a checklist. We design cybersecurity programs that reduce real risk and support how the organization actually operates.",
    },
    {
      title: "Governance Driven",
      body: "Strong governance creates stronger organizations. We integrate governance, risk management, cybersecurity, internal controls, and technology strategy into every engagement.",
    },
    {
      title: "Long-Term Partnerships",
      body: "We measure success by the long-term value we create - aiming to be trusted advisors who support organizations throughout their digital transformation journey, not deliver isolated projects.",
    },
  ];

  await prisma.differentiator.createMany({
    data: items.map((item, index) => ({ ...item, order: index })),
  });
}

async function seedServices() {
  const existing = await prisma.service.count();
  if (existing > 0) return;

  const services = [
    {
      slug: "technology-advisory",
      name: "Technology Advisory",
      summary: "Helping organizations make informed technology decisions aligned with business strategy.",
      icon: "compass",
      items: [
        "Technology Strategy Development",
        "CIO Advisory",
        "Technology Roadmaps",
        "Digital Transformation Advisory",
        "IT Governance",
        "Technology Investment Advisory",
      ],
    },
    {
      slug: "cybersecurity-consulting",
      name: "Cybersecurity Consulting",
      summary: "Protecting organizations against an increasingly sophisticated threat landscape.",
      icon: "shield-check",
      items: [
        "Cybersecurity Risk Assessments",
        "Vulnerability Assessments",
        "Security Awareness Programs",
        "Cybersecurity Policy Development",
        "Security Maturity Assessments",
        "Penetration Testing Coordination",
        "Incident Response Planning",
      ],
    },
    {
      slug: "technology-risk-assurance",
      name: "Technology Risk & Assurance",
      summary: "Providing independent assurance over technology environments and digital risks.",
      icon: "clipboard-check",
      items: [
        "IT Audits",
        "ERP Control Reviews",
        "Information Systems Assurance",
        "Technology Risk Assessments",
        "Third-Party Technology Risk Reviews",
        "Internal Control Reviews",
      ],
    },
    {
      slug: "digital-governance-compliance",
      name: "Digital Governance & Compliance",
      summary: "Helping organizations meet regulatory and industry expectations.",
      icon: "scale",
      items: [
        "Data Protection Compliance",
        "Cybersecurity Governance Frameworks",
        "Disaster Recovery Planning",
        "ISO 27001 Readiness",
        "Business Continuity Planning",
        "Policy & Procedure Development",
      ],
    },
    {
      slug: "cloud-digital-infrastructure",
      name: "Cloud & Digital Infrastructure",
      summary: "Supporting secure adoption of modern technologies.",
      icon: "cloud",
      items: [
        "Cloud Readiness Assessments",
        "Cloud Governance",
        "Secure Cloud Migration Advisory",
        "Microsoft 365 Security Reviews",
        "Identity & Access Management",
      ],
    },
    {
      slug: "systems-software-development",
      name: "Systems & Software Development",
      summary: "Custom-built systems and software, designed, developed, and implemented around your business needs.",
      icon: "code",
      items: [
        "Custom Software Development",
        "Web & Mobile Application Development",
        "Software Implementation & Rollout",
        "Systems Design & Architecture",
        "Systems Integration",
        "Post-Implementation Support & Maintenance",
      ],
    },
    {
      slug: "enterprise-technology-solutions",
      name: "Enterprise Technology Solutions",
      summary: "Helping organizations maximize value from business systems.",
      icon: "boxes",
      items: [
        "ERP Advisory",
        "Business Process Automation",
        "ERP Security Reviews",
        "ERP Governance",
        "Systems Selection Support",
        "Digital Process Optimization",
      ],
    },
    {
      slug: "managed-it-services",
      name: "Managed IT Services",
      summary: "Reliable, proactive IT support that keeps organizations running securely.",
      icon: "headset",
      items: [
        "IT Helpdesk & End-User Support",
        "Server & Endpoint Management",
        "IT Asset Management",
        "Network Monitoring & Maintenance",
        "Patch & Update Management",
        "Backup & Disaster Recovery Support",
      ],
    },
    {
      slug: "domain-web-hosting-services",
      name: "Domain & Web Hosting Services",
      summary: "Secure, dependable hosting foundations for your digital presence.",
      icon: "globe",
      items: [
        "Domain Registration & Management",
        "SSL Certificate Management",
        "Website Security Monitoring",
        "Web Hosting & Server Administration",
        "Email Hosting & Configuration",
        "Uptime & Performance Management",
      ],
    },
  ];

  for (const [index, service] of services.entries()) {
    await prisma.service.create({
      data: {
        slug: service.slug,
        name: service.name,
        summary: service.summary,
        icon: service.icon,
        order: index,
        items: {
          create: service.items.map((label, itemIndex) => ({ label, order: itemIndex })),
        },
      },
    });
  }
}

async function seedIndustries() {
  const existing = await prisma.industry.count();
  if (existing > 0) return;

  const industries = [
    {
      name: "Financial Services",
      blurb: "Banks, insurers, and fintechs navigating regulatory and cyber risk.",
    },
    {
      name: "NGOs & Development Partners",
      blurb: "Donor-funded programs safeguarding data and operational integrity.",
    },
    {
      name: "Professional Services",
      blurb: "Firms protecting client data and strengthening internal governance.",
    },
    {
      name: "Government",
      blurb: "Public institutions modernizing systems while managing citizen data responsibly.",
    },
    {
      name: "Logistics & Supply Chain",
      blurb: "Operators securing complex, multi-site technology environments.",
    },
    {
      name: "Healthcare",
      blurb: "Providers protecting patient information and critical care systems.",
    },
    {
      name: "Manufacturing",
      blurb: "Industrial operators securing OT/IT convergence and ERP systems.",
    },
    {
      name: "Education",
      blurb: "Institutions safeguarding student data and digital learning platforms.",
    },
    {
      name: "Retail & Distribution",
      blurb: "Retailers protecting customer data across digital and physical channels.",
    },
    {
      name: "Hospitality",
      blurb: "Hospitality groups securing guest data and connected property systems.",
    },
  ];

  await prisma.industry.createMany({
    data: industries.map((industry, index) => ({ ...industry, order: index })),
  });
}

async function seedPromiseItems() {
  const existing = await prisma.promiseItem.count();
  if (existing > 0) return;

  const items = [
    { title: "Understand the Business", body: "We take time to understand our clients before proposing solutions." },
    { title: "Deliver Practical Solutions", body: "Recommendations must be realistic, measurable, and implementable." },
    { title: "Build Lasting Capability", body: "We empower organizations rather than create dependency." },
    { title: "Create Long-Term Value", body: "Our focus is sustainable improvement - not short-term fixes." },
  ];

  await prisma.promiseItem.createMany({
    data: items.map((item, index) => ({ ...item, order: index })),
  });
}

async function seedTeamMembers() {
  const existing = await prisma.teamMember.count();
  if (existing > 0) return;

  const members = [
    {
      name: "Amara Okonjo",
      role: "Managing Partner",
      bio: "Amara leads CyFort's advisory practice, working with executive teams across Africa to align technology investment with business strategy. She has over fifteen years of experience in technology advisory and governance.",
      linkedinUrl: "https://www.linkedin.com/in/amara-okonjo",
      photoFile: "amara-okonjo.png",
    },
    {
      name: "Kwame Asante",
      role: "Head of Cybersecurity Advisory",
      bio: "Kwame heads CyFort's cybersecurity consulting practice, designing risk-based security programs for financial services, healthcare, and NGO clients. He is a certified information security manager with a background in security operations.",
      linkedinUrl: "https://www.linkedin.com/in/kwame-asante",
      photoFile: "kwame-asante.png",
    },
    {
      name: "Naledi Mokoena",
      role: "Head of Technology Strategy",
      bio: "Naledi advises boards and leadership teams on technology roadmaps, digital transformation, and IT governance. She previously held CIO advisory roles supporting organizations through large-scale systems change.",
      linkedinUrl: "https://www.linkedin.com/in/naledi-mokoena",
      photoFile: "naledi-mokoena.png",
    },
    {
      name: "Tariq Hassan",
      role: "Risk & Compliance Lead",
      bio: "Tariq leads technology risk assessments, IT audits, and compliance engagements, helping clients meet regulatory expectations while strengthening internal controls across their technology environments.",
      linkedinUrl: "https://www.linkedin.com/in/tariq-hassan",
      photoFile: "tariq-hassan.png",
    },
    {
      name: "Chiamaka Eze",
      role: "Data & AI Advisory Lead",
      bio: "Chiamaka works with clients on data governance, analytics strategy, and responsible adoption of AI, helping organizations turn data into a trusted business asset.",
      linkedinUrl: "https://www.linkedin.com/in/chiamaka-eze",
      photoFile: "chiamaka-eze.png",
    },
    {
      name: "Brian Mwangi",
      role: "Operations & Managed Services Lead",
      bio: "Brian oversees CyFort's managed IT services and infrastructure practice, ensuring client environments remain secure, available, and well supported day to day.",
      linkedinUrl: "https://www.linkedin.com/in/brian-mwangi",
      photoFile: "brian-mwangi.png",
    },
  ];

  // Sample headshots live as static files under public/images/generated/team
  // (generated placeholder photos, not uploads) — each gets a Media row so
  // TeamCard can resolve it through the normal photoMediaId/resolveMediaUrl
  // path, same as a real admin-uploaded photo.
  for (const [index, member] of members.entries()) {
    const { photoFile, ...memberData } = member;
    const filePath = path.join(process.cwd(), "public", "images", "generated", "team", photoFile);
    const size = statSync(filePath).size;

    const media = await prisma.media.create({
      data: {
        url: `/images/generated/team/${photoFile}`,
        filename: photoFile,
        alt: `${member.name} — ${member.role}`,
        mimeType: "image/png",
        size,
      },
    });

    await prisma.teamMember.create({
      data: {
        ...memberData,
        photoMediaId: media.id,
        order: index,
        published: true,
      },
    });
  }
}

async function seedCaseStudies() {
  const existing = await prisma.caseStudy.count();
  if (existing > 0) return;

  const now = Date.now();
  const day = 1000 * 60 * 60 * 24;

  const caseStudies = [
    {
      slug: "regional-bank-cybersecurity-maturity",
      title: "Strengthening Cybersecurity Maturity for a Regional Retail Bank",
      clientName: "A regional retail bank",
      industryTag: "Financial Services",
      summary:
        "CyFort conducted a cybersecurity maturity assessment and designed a roadmap that helped the bank close critical gaps ahead of a regulatory review.",
      body: [
        "**The Challenge**",
        "A regional retail bank faced a tightening regulatory environment and a growing threat landscape, but lacked visibility into how its cybersecurity program measured up against industry expectations.",
        "**Our Approach**",
        "CyFort conducted a comprehensive cybersecurity maturity assessment across governance, risk management, security operations, and incident response, benchmarked against recognized frameworks. We prioritized findings by business risk rather than technical severity alone, and worked with the executive team to build a realistic, phased remediation roadmap.",
        "**The Outcome**",
        "The bank entered its next regulatory review with a documented maturity baseline and an executive-approved roadmap already underway. Critical gaps in access management and incident response were closed within the first two quarters, and the board gained a clear view of ongoing cyber risk.",
      ].join("\n\n"),
      publishedAt: new Date(now - 120 * day),
      order: 0,
    },
    {
      slug: "telecom-cloud-migration-governance",
      title: "Secure Cloud Migration Governance for a Pan-African Telecom Operator",
      clientName: "A pan-African telecom operator",
      industryTag: "Logistics & Supply Chain",
      summary:
        "We established cloud governance guardrails that allowed the operator to migrate core workloads to the cloud without compromising security or compliance.",
      body: [
        "**The Challenge**",
        "A fast-growing telecom operator was migrating core business systems to the cloud across multiple countries, but had no consistent governance model to manage risk, cost, and compliance across the estate.",
        "**Our Approach**",
        "CyFort ran a cloud readiness assessment, defined a cloud governance framework covering identity and access management, data residency, and security configuration standards, and supported the migration of priority workloads with hands-on advisory.",
        "**The Outcome**",
        "The operator completed its first wave of migrations on schedule, with standardized security baselines applied across every new environment. Leadership now has a single governance model to apply as additional business units move to the cloud.",
      ].join("\n\n"),
      publishedAt: new Date(now - 90 * day),
      order: 1,
    },
    {
      slug: "ngo-donor-systems-risk-review",
      title: "Technology Risk Review for a Donor-Funded Development Program",
      clientName: "An international development NGO",
      industryTag: "NGOs & Development Partners",
      summary:
        "CyFort reviewed the technology and data controls protecting a multi-country donor-funded program, giving the organization assurance ahead of a major grant renewal.",
      body: [
        "**The Challenge**",
        "Ahead of a major grant renewal, a development organization needed independent assurance that the systems managing beneficiary data and donor funds across several country offices met donor expectations.",
        "**Our Approach**",
        "We performed an information systems assurance review spanning access controls, financial system integrity, and data protection practices across country offices, and worked with program teams to translate findings into plain-language, actionable recommendations.",
        "**The Outcome**",
        "The organization presented donors with a clean, independently reviewed control environment, supporting a successful grant renewal, and adopted a simplified set of control standards for future country office rollouts.",
      ].join("\n\n"),
      publishedAt: new Date(now - 60 * day),
      order: 2,
    },
    {
      slug: "manufacturer-erp-governance",
      title: "ERP Governance and Security Review for a Regional Manufacturer",
      clientName: "A regional manufacturing group",
      industryTag: "Manufacturing",
      summary:
        "We helped a manufacturing group strengthen ERP governance and close long-standing segregation-of-duties gaps uncovered during a system upgrade.",
      body: [
        "**The Challenge**",
        "A multi-site manufacturing group was upgrading its core ERP system but had accumulated years of inconsistent access provisioning, creating segregation-of-duties risks across finance and procurement.",
        "**Our Approach**",
        "CyFort reviewed ERP roles and access against segregation-of-duties best practice, redesigned the access model, and worked with IT and finance leadership to implement governance processes for ongoing access reviews.",
        "**The Outcome**",
        "The upgrade went live with a clean access model in place, materially reducing financial control risk, and the group now runs quarterly access reviews as part of standard ERP governance.",
      ].join("\n\n"),
      publishedAt: new Date(now - 30 * day),
      order: 3,
    },
  ];

  await prisma.caseStudy.createMany({
    data: caseStudies.map((item) => ({ ...item, published: true })),
  });
}

async function seedInsightPosts() {
  const existing = await prisma.insightPost.count();
  if (existing > 0) return;

  const now = Date.now();
  const day = 1000 * 60 * 60 * 24;

  const posts = [
    {
      slug: "cybersecurity-business-imperative",
      title: "Why Cybersecurity Is Now a Business Imperative, Not Just an IT Function",
      excerpt:
        "Boards and executive teams increasingly treat cybersecurity as a strategic risk. Here's what that shift means in practice.",
      body: [
        "For years, cybersecurity was treated as a technical problem, owned by IT and measured in technical terms. That view no longer holds up.",
        "Across the organizations we advise, boards are asking sharper questions about cyber risk: What is our exposure? What would an incident cost us - financially and reputationally? Are we investing in the right controls?",
        "Answering those questions well requires framing cybersecurity in business terms, not just technical ones. Risk-based prioritization, clear ownership at the executive level, and measurable maturity targets matter more than any single tool or technology.",
        "Organizations that make this shift tend to build security programs that are both more resilient and better funded, because leadership understands what is at stake.",
      ].join("\n\n"),
      authorName: "Kwame Asante",
      category: "Cybersecurity",
      publishedAt: new Date(now - 100 * day),
    },
    {
      slug: "digital-transformation-starts-with-business-case",
      title: "Digital Transformation Should Start with a Business Case, Not a Technology Choice",
      excerpt:
        "The organizations that get the most from digital transformation start by defining the business outcome, then work backward to technology.",
      body: [
        "It is tempting to start a digital transformation program with a technology decision - a new ERP, a cloud platform, an automation tool. In practice, the organizations that succeed start somewhere else entirely: with a clearly defined business outcome.",
        "Before any technology conversation, we ask clients what the transformation needs to achieve - faster customer onboarding, lower operating cost, better regulatory reporting - and who in the business is accountable for that outcome.",
        "Only once that is clear does it make sense to evaluate technology options, because the right architecture, vendor, and rollout plan depend entirely on what the business actually needs to accomplish.",
      ].join("\n\n"),
      authorName: "Naledi Mokoena",
      category: "Digital Transformation",
      publishedAt: new Date(now - 80 * day),
    },
    {
      slug: "practical-guide-technology-risk-assessments",
      title: "A Practical Guide to Running a Technology Risk Assessment",
      excerpt:
        "Technology risk assessments often feel abstract. Here is a practical structure that keeps them grounded in business impact.",
      body: [
        "Technology risk assessments can easily become checklist exercises that produce long reports and little action. A better approach keeps the process grounded in business impact from the start.",
        "We typically structure assessments around three questions: what are the organization's most critical systems and data, what could realistically go wrong, and what would the business impact be if it did?",
        "Scoring risks against business impact - rather than technical severity alone - makes it far easier for leadership to prioritize remediation and allocate budget to the issues that matter most.",
      ].join("\n\n"),
      authorName: "Tariq Hassan",
      category: "Risk & Compliance",
      publishedAt: new Date(now - 65 * day),
    },
    {
      slug: "data-governance-before-ai-adoption",
      title: "Why Data Governance Has to Come Before AI Adoption",
      excerpt:
        "Organizations rushing to adopt AI often skip a foundational step: getting their data governance right first.",
      body: [
        "Many organizations are eager to adopt AI tools, but far fewer have the data governance foundation needed to do so responsibly.",
        "Before deploying AI, we encourage clients to answer basic questions: where does the relevant data live, who owns it, how accurate is it, and what access controls and retention rules apply to it?",
        "Skipping this step tends to surface problems later - inconsistent data producing unreliable AI outputs, or sensitive information being exposed to tools without proper controls. Getting governance right first makes AI adoption faster and safer, not slower.",
      ].join("\n\n"),
      authorName: "Chiamaka Eze",
      category: "Data & AI",
      publishedAt: new Date(now - 45 * day),
    },
    {
      slug: "regulatory-expectations-data-protection",
      title: "What Regulators Across Africa Now Expect on Data Protection",
      excerpt:
        "Data protection regulation is maturing across African markets. Here's what organizations should be preparing for.",
      body: [
        "Data protection regulation has matured significantly across African markets in recent years, with regulators moving from guidance to active enforcement.",
        "Organizations we work with are increasingly expected to demonstrate - not just assert - that they have appropriate data protection controls: documented data flows, lawful bases for processing, breach response plans, and evidence of ongoing compliance monitoring.",
        "Getting ahead of these expectations, rather than reacting to an incident or regulatory inquiry, remains the most cost-effective path, and it starts with a clear-eyed assessment of current data protection practice.",
      ].join("\n\n"),
      authorName: "Tariq Hassan",
      category: "Risk & Compliance",
      publishedAt: new Date(now - 20 * day),
    },
    {
      slug: "keeping-managed-it-secure-and-reliable",
      title: "Keeping Managed IT Both Secure and Reliable",
      excerpt:
        "Reliable IT support and strong security are often treated as separate concerns. The organizations that do both well treat them as one.",
      body: [
        "IT support and cybersecurity are often managed as separate workstreams - one focused on keeping systems running, the other on keeping them safe. In practice, the two are deeply connected.",
        "Patch management, endpoint monitoring, and backup discipline are operational tasks, but they are also some of the most effective security controls an organization has. Treating them as a single, well-governed managed services function - rather than two competing priorities - produces better outcomes on both fronts.",
        "Organizations that get this right tend to have fewer incidents and faster recovery when something does go wrong, simply because security hygiene is built into day-to-day operations rather than bolted on afterward.",
      ].join("\n\n"),
      authorName: "Brian Mwangi",
      category: "Managed IT",
      publishedAt: new Date(now - 10 * day),
    },
  ];

  await prisma.insightPost.createMany({
    data: posts.map((post) => ({ ...post, published: true })),
  });
}

async function seedJobPostings() {
  const existing = await prisma.jobPosting.count();
  if (existing > 0) return;

  const now = Date.now();
  const day = 1000 * 60 * 60 * 24;

  const jobs = [
    {
      slug: "cybersecurity-consultant",
      title: "Cybersecurity Consultant",
      department: "Cybersecurity Advisory",
      location: "Nairobi, Kenya",
      employmentType: "Full-time",
      summary:
        "Support cybersecurity risk assessments, maturity reviews, and policy development for clients across financial services, healthcare, and NGO sectors.",
      description: [
        "**About the Role**",
        "We are looking for a Cybersecurity Consultant to join our advisory practice, supporting engagements across risk assessments, security maturity reviews, and policy development.",
        "**Responsibilities**",
        "- Conduct cybersecurity risk and maturity assessments for client organizations\n- Support development of security policies, frameworks, and governance documentation\n- Coordinate vulnerability assessments and liaise with technical testing partners\n- Prepare clear, business-focused findings and recommendations for client leadership",
        "**Requirements**",
        "- 3+ years of experience in cybersecurity consulting, risk, or security operations\n- Familiarity with recognized security frameworks (e.g. ISO 27001, NIST)\n- Strong written and verbal communication skills\n- Relevant certification (CISSP, CISM, or equivalent) is an advantage",
      ].join("\n\n"),
      closesAt: new Date(now + 30 * day),
    },
    {
      slug: "technology-risk-analyst",
      title: "Technology Risk Analyst",
      department: "Technology Risk & Assurance",
      location: "Nairobi, Kenya",
      employmentType: "Full-time",
      summary:
        "Support IT audits, ERP control reviews, and technology risk assessments across a range of client industries.",
      description: [
        "**About the Role**",
        "The Technology Risk Analyst will support our Technology Risk & Assurance practice, working on IT audits, ERP control reviews, and third-party risk assessments.",
        "**Responsibilities**",
        "- Perform IT general controls and application control testing\n- Support ERP control reviews, including segregation-of-duties analysis\n- Document findings and assist in drafting client-ready reports\n- Participate in technology risk assessments across client sectors",
        "**Requirements**",
        "- 2+ years of experience in IT audit, risk, or assurance\n- Working knowledge of ERP systems and common control frameworks\n- Strong analytical and documentation skills\n- Professional certification (CISA or equivalent) is an advantage",
      ].join("\n\n"),
      closesAt: new Date(now + 21 * day),
    },
    {
      slug: "digital-transformation-associate",
      title: "Digital Transformation Associate",
      department: "Technology Advisory",
      location: "Remote - Africa",
      employmentType: "Full-time",
      summary:
        "Support technology strategy and digital transformation engagements, from roadmap development through implementation support.",
      description: [
        "**About the Role**",
        "We are hiring a Digital Transformation Associate to support technology strategy and transformation engagements for clients across Africa.",
        "**Responsibilities**",
        "- Support development of technology roadmaps and transformation business cases\n- Assist with stakeholder workshops and requirements gathering\n- Track implementation progress and support project governance\n- Prepare client-facing materials and presentations",
        "**Requirements**",
        "- 2+ years of experience in technology consulting, strategy, or project delivery\n- Strong organizational and communication skills\n- Comfort working directly with senior client stakeholders\n- Willingness to travel periodically across the region",
      ].join("\n\n"),
      closesAt: new Date(now + 45 * day),
    },
    {
      slug: "managed-services-engineer",
      title: "Managed Services Engineer",
      department: "Managed IT Services",
      location: "Nairobi, Kenya",
      employmentType: "Full-time",
      summary:
        "Provide day-to-day IT support, server and endpoint management, and monitoring for managed services clients.",
      description: [
        "**About the Role**",
        "The Managed Services Engineer will support our managed IT services clients, handling helpdesk support, infrastructure monitoring, and maintenance.",
        "**Responsibilities**",
        "- Provide first- and second-line support to end users\n- Manage servers, endpoints, and network monitoring tools\n- Apply patches and updates in line with change management procedures\n- Support backup and disaster recovery processes",
        "**Requirements**",
        "- 2+ years of experience in IT support or systems administration\n- Familiarity with Windows Server, Microsoft 365, and common networking concepts\n- Strong troubleshooting skills and a client-service mindset\n- Relevant technical certification is an advantage",
      ].join("\n\n"),
      closesAt: new Date(now + 14 * day),
    },
  ];

  await prisma.jobPosting.createMany({
    data: jobs.map((job) => ({ ...job, published: true })),
  });
}

async function seedContactSubmissions() {
  const existing = await prisma.contactSubmission.count();
  if (existing > 0) return;

  const submissions = [
    {
      name: "Grace Wanjiru",
      email: "grace.wanjiru@examplecorp.co.ke",
      company: "Example Corp Insurance",
      phone: "+254 712 345 678",
      subject: "Cybersecurity maturity assessment inquiry",
      message:
        "Hello, we are exploring a cybersecurity maturity assessment ahead of our upcoming regulatory audit. Could someone from your advisory team reach out to discuss scope and timelines?",
    },
    {
      name: "David Osei",
      email: "d.osei@gmail.com",
      company: undefined,
      subject: "Application for Cybersecurity Consultant role",
      message:
        "Hi, I noticed the Cybersecurity Consultant opening on your careers page. I have five years of experience in security operations and risk advisory and would love to learn more about the role before applying formally.",
    },
    {
      name: "Patricia Nduta",
      email: "patricia.nduta@regionalbankgroup.com",
      company: "Regional Bank Group",
      phone: "+254 733 221 100",
      subject: "Partnership and ERP governance support",
      message:
        "We are midway through an ERP upgrade and are looking for an independent partner to review our access and controls model before go-live. Please let us know how to get started and what information you would need from us.",
    },
    {
      name: "Samuel Achebe",
      email: "samuel.achebe@outlook.com",
      subject: "General inquiry - cloud governance",
      message:
        "We are a mid-sized logistics company planning a move to the cloud over the next year and would like to understand how your cloud governance advisory works, including typical engagement length and cost.",
    },
  ];

  await prisma.contactSubmission.createMany({
    data: submissions.map((submission) => ({ ...submission, status: "new" })),
  });
}

async function main() {
  await seedAdminUser();
  await seedSiteSettings();
  await seedNavLinks();
  await seedHomeHero();
  await seedAboutContent();
  await seedDifferentiators();
  await seedServices();
  await seedIndustries();
  await seedPromiseItems();
  await seedTeamMembers();
  await seedCaseStudies();
  await seedInsightPosts();
  await seedJobPostings();
  await seedContactSubmissions();

  console.log("Seed complete.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
