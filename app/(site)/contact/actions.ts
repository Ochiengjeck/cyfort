"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { contactSubmissionSchema } from "@/lib/validation/contact";

export type ContactFormState = {
  error: string | null;
  success: boolean;
};

export async function submitContactAction(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = contactSubmissionSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company") || undefined,
    phone: formData.get("phone") || undefined,
    subject: formData.get("subject") || undefined,
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form and try again.", success: false };
  }

  const headerList = await headers();

  await prisma.contactSubmission.create({
    data: {
      ...parsed.data,
      ipAddress: headerList.get("x-forwarded-for"),
      userAgent: headerList.get("user-agent"),
    },
  });

  return { error: null, success: true };
}
