import { z } from "zod";

export const aboutContentSchema = z.object({
  whoWeAreBody: z.string().min(1),
  pullQuote: z.string().min(1),
  vision: z.string().min(1),
  mission: z.string().min(1),
  approachIntro: z.string().min(1),
  approachBody: z.string().min(1),
  comparisonLeftLabel: z.string().min(1),
  comparisonLeftText: z.string().min(1),
  comparisonRightLabel: z.string().min(1),
  comparisonRightText: z.string().min(1),
  closingEyebrow: z.string().min(1),
  closingHeading: z.string().min(1),
  closingBody: z.string().min(1),
  closingQuote: z.string().min(1),
});
