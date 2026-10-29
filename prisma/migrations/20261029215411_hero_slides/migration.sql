-- DropTable
DROP TABLE "HomeHero";

-- CreateTable
CREATE TABLE "HeroSlide" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "eyebrow" TEXT NOT NULL DEFAULT 'TECHNOLOGY · ADVISORY · CYBERSECURITY',
    "headlineLead" TEXT NOT NULL DEFAULT 'Securing',
    "headlineEmphasis" TEXT NOT NULL DEFAULT 'Digital Growth Across Africa',
    "description" TEXT NOT NULL DEFAULT 'We empower organizations to navigate the cyber landscape, build resilient digital ecosystems, and drive sustainable growth across the continent.',
    "primaryCtaLabel" TEXT NOT NULL DEFAULT 'Book a Data Protection Health Check',
    "primaryCtaHref" TEXT NOT NULL DEFAULT '/contact',
    "secondaryCtaLabel" TEXT NOT NULL DEFAULT 'Explore our services',
    "secondaryCtaHref" TEXT NOT NULL DEFAULT '/services',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HeroSlide_pkey" PRIMARY KEY ("id")
);
