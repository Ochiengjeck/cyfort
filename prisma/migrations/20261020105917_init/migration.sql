-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "siteName" TEXT NOT NULL DEFAULT 'CyFort Technologies Limited',
    "shortName" TEXT NOT NULL DEFAULT 'CYFORT',
    "tagline" TEXT NOT NULL DEFAULT 'Securing Digital Growth Across Africa',
    "categoryLine" TEXT NOT NULL DEFAULT 'TECHNOLOGY · ADVISORY · CYBERSECURITY',
    "metaDescription" TEXT,
    "logoMediaId" TEXT,
    "faviconMediaId" TEXT,
    "contactEmail" TEXT NOT NULL DEFAULT 'info@cyfort.africa',
    "contactPhone" TEXT NOT NULL DEFAULT '+254 7__ ___ ___',
    "contactAddress" TEXT,
    "linkedinUrl" TEXT,
    "twitterUrl" TEXT,
    "facebookUrl" TEXT,
    "footerText" TEXT,
    "colorDark" TEXT NOT NULL DEFAULT '#0A0A0B',
    "colorInk" TEXT NOT NULL DEFAULT '#141414',
    "colorGold" TEXT NOT NULL DEFAULT '#C9A227',
    "colorGoldDark" TEXT NOT NULL DEFAULT '#9C7A3C',
    "colorGoldLight" TEXT NOT NULL DEFAULT '#E8CE8F',
    "colorPaper" TEXT NOT NULL DEFAULT '#F2F3F5',
    "colorPaperAlt" TEXT NOT NULL DEFAULT '#FFFFFF',
    "colorMuted" TEXT NOT NULL DEFAULT '#6B7280',
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "NavLink" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "order" INTEGER NOT NULL DEFAULT 0,
    "label" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "openInNewTab" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "HomeHero" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eyebrow" TEXT NOT NULL DEFAULT 'TECHNOLOGY · ADVISORY · CYBERSECURITY',
    "headlineLead" TEXT NOT NULL DEFAULT 'Securing',
    "headlineEmphasis" TEXT NOT NULL DEFAULT 'Digital Growth Across Africa',
    "primaryCtaLabel" TEXT NOT NULL DEFAULT 'Explore Our Services',
    "primaryCtaHref" TEXT NOT NULL DEFAULT '/services',
    "secondaryCtaLabel" TEXT NOT NULL DEFAULT 'Talk to Us',
    "secondaryCtaHref" TEXT NOT NULL DEFAULT '/contact',
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AboutContent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "whoWeAreBody" TEXT NOT NULL,
    "pullQuote" TEXT NOT NULL DEFAULT 'At CYFORT, we believe cybersecurity is no longer just an IT function — it is a business imperative.',
    "vision" TEXT NOT NULL,
    "mission" TEXT NOT NULL,
    "approachIntro" TEXT NOT NULL,
    "approachBody" TEXT NOT NULL,
    "comparisonLeftLabel" TEXT NOT NULL DEFAULT 'Most Firms',
    "comparisonLeftText" TEXT NOT NULL DEFAULT 'Begin with technology',
    "comparisonRightLabel" TEXT NOT NULL DEFAULT 'We',
    "comparisonRightText" TEXT NOT NULL DEFAULT 'Begin With The Business',
    "closingEyebrow" TEXT NOT NULL DEFAULT 'LOOKING AHEAD',
    "closingHeading" TEXT NOT NULL DEFAULT 'Securing Tomorrow''s Digital Africa',
    "closingBody" TEXT NOT NULL,
    "closingQuote" TEXT NOT NULL DEFAULT 'Together, we help organizations secure today, prepare for tomorrow, and build confidence in a digital future.',
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Differentiator" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "order" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "order" INTEGER NOT NULL DEFAULT 0,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "icon" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ServiceItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "serviceId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "label" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ServiceItem_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Industry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "order" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,
    "blurb" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PromiseItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "order" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "order" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "bio" TEXT,
    "photoMediaId" TEXT,
    "linkedinUrl" TEXT,
    "email" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "CaseStudy" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "industryTag" TEXT,
    "summary" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "coverMediaId" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" DATETIME,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "InsightPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "coverMediaId" TEXT,
    "authorName" TEXT,
    "category" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "JobPosting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "department" TEXT,
    "location" TEXT,
    "employmentType" TEXT,
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "applyEmail" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "closesAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ContactSubmission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT,
    "phone" TEXT,
    "subject" TEXT,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'new',
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "alt" TEXT,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Service_slug_key" ON "Service"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "CaseStudy_slug_key" ON "CaseStudy"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "InsightPost_slug_key" ON "InsightPost"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "JobPosting_slug_key" ON "JobPosting"("slug");
