import { z } from "zod";

const hexColor = z.string().regex(/^#[0-9a-fA-F]{6}$/, "Must be a hex color like #C9A227");

export const generalSettingsSchema = z.object({
  siteName: z.string().min(1),
  shortName: z.string().min(1),
  tagline: z.string().min(1),
  categoryLine: z.string().min(1),
  metaDescription: z.string().optional(),
  contactEmail: z.string().email(),
  contactPhone: z.string().min(1),
  contactAddress: z.string().optional(),
  whatsappNumber: z.string().optional(),
  whatsappMessage: z.string().optional(),
  linkedinUrl: z.string().optional(),
  twitterUrl: z.string().optional(),
  facebookUrl: z.string().optional(),
  footerText: z.string().optional(),
});

export const themeSettingsSchema = z.object({
  colorDark: hexColor,
  colorInk: hexColor,
  colorGold: hexColor,
  colorGoldDark: hexColor,
  colorGoldLight: hexColor,
  colorPaper: hexColor,
  colorPaperAlt: hexColor,
  colorMuted: hexColor,
});
