-- CreateEnum
CREATE TYPE "ServicePillar" AS ENUM ('ADVISE', 'SECURE_ASSURE', 'BUILD_RUN');

-- AlterTable
ALTER TABLE "AboutContent" ADD COLUMN     "closingPrimaryCtaHref" TEXT NOT NULL DEFAULT '/contact',
ADD COLUMN     "closingPrimaryCtaLabel" TEXT NOT NULL DEFAULT 'Book a Health Check',
ADD COLUMN     "closingSecondaryCtaHref" TEXT NOT NULL DEFAULT '/contact',
ADD COLUMN     "closingSecondaryCtaLabel" TEXT NOT NULL DEFAULT 'Talk to a partner',
ADD COLUMN     "trustBadges" TEXT DEFAULT 'ODPC · Data Protection Act 2019
SASRA
Central Bank of Kenya
Donor & UN due diligence
ISO/IEC 27001',
ADD COLUMN     "trustStripLabel" TEXT DEFAULT 'BUILT FOR ORGANISATIONS ANSWERING TO';

-- AlterTable
ALTER TABLE "ContactSubmission" ADD COLUMN     "consent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sector" TEXT,
ADD COLUMN     "serviceInterest" TEXT;

-- AlterTable
ALTER TABLE "Industry" ADD COLUMN     "drivingText" TEXT,
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "startServiceId" TEXT,
ADD COLUMN     "startText" TEXT;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "builtForTags" TEXT,
ADD COLUMN     "ctaHref" TEXT,
ADD COLUMN     "ctaLabel" TEXT,
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pillar" "ServicePillar" NOT NULL DEFAULT 'SECURE_ASSURE',
ADD COLUMN     "triggerText" TEXT;

-- AlterTable
ALTER TABLE "SiteSettings" ALTER COLUMN "colorPaper" SET DEFAULT '#F7F6F2',
ALTER COLUMN "colorPaperAlt" SET DEFAULT '#EFEDE6';

-- AddForeignKey
ALTER TABLE "Industry" ADD CONSTRAINT "Industry_startServiceId_fkey" FOREIGN KEY ("startServiceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;
