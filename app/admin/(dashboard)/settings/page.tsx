import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { FormField } from "@/components/admin/form-field";
import { TextareaField } from "@/components/admin/textarea-field";
import { ColorField } from "@/components/admin/color-field";
import { SubmitButton } from "@/components/admin/submit-button";
import { SettingsTabs } from "./settings-tabs";
import { updateGeneralSettingsAction, updateThemeAction } from "./actions";

export const instant = false;

export default async function AdminSettingsPage() {
  await connection();
  const settings = await prisma.siteSettings.findFirst();
  if (!settings) return <p className="text-white/60">Site settings row is missing.</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">Settings & Theme</h1>
      <p className="mt-1 text-sm text-white/50">Site identity, contact details, and brand colors.</p>

      <div className="mt-8 max-w-2xl">
        <SettingsTabs
          general={
            <form action={updateGeneralSettingsAction} className="flex flex-col gap-5">
              <FormField label="Site Name" name="siteName" defaultValue={settings.siteName} required />
              <FormField label="Short Name" name="shortName" defaultValue={settings.shortName} required />
              <FormField label="Tagline" name="tagline" defaultValue={settings.tagline} required />
              <FormField label="Category Line" name="categoryLine" defaultValue={settings.categoryLine} required />
              <TextareaField
                label="Meta Description"
                name="metaDescription"
                defaultValue={settings.metaDescription}
                rows={3}
              />
              <FormField label="Contact Email" name="contactEmail" type="email" defaultValue={settings.contactEmail} required />
              <FormField label="Contact Phone" name="contactPhone" defaultValue={settings.contactPhone} required />
              <FormField label="Contact Address" name="contactAddress" defaultValue={settings.contactAddress} />
              <FormField label="LinkedIn URL" name="linkedinUrl" defaultValue={settings.linkedinUrl} />
              <FormField label="Twitter / X URL" name="twitterUrl" defaultValue={settings.twitterUrl} />
              <FormField label="Facebook URL" name="facebookUrl" defaultValue={settings.facebookUrl} />
              <TextareaField label="Footer Text" name="footerText" defaultValue={settings.footerText} rows={2} />
              <div>
                <SubmitButton />
              </div>
            </form>
          }
          theme={
            <form action={updateThemeAction} className="flex flex-col gap-5">
              <p className="text-sm text-white/50">
                These 8 brand colors drive every page. Text/background pairings are fixed, so any
                combination you choose stays legible.
              </p>
              <div className="grid grid-cols-2 gap-5">
                <ColorField label="Dark Surface" name="colorDark" defaultValue={settings.colorDark} />
                <ColorField label="Ink (text on paper)" name="colorInk" defaultValue={settings.colorInk} />
                <ColorField label="Gold (primary accent)" name="colorGold" defaultValue={settings.colorGold} />
                <ColorField label="Gold — Dark" name="colorGoldDark" defaultValue={settings.colorGoldDark} />
                <ColorField label="Gold — Light" name="colorGoldLight" defaultValue={settings.colorGoldLight} />
                <ColorField label="Paper Background" name="colorPaper" defaultValue={settings.colorPaper} />
                <ColorField label="Paper Alt (white)" name="colorPaperAlt" defaultValue={settings.colorPaperAlt} />
                <ColorField label="Muted Text" name="colorMuted" defaultValue={settings.colorMuted} />
              </div>
              <div>
                <SubmitButton />
              </div>
            </form>
          }
        />
      </div>
    </div>
  );
}
