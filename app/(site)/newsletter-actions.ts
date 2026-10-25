"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { newsletterSubscriberSchema } from "@/lib/validation/newsletter";

export type NewsletterFormState = {
  error: string | null;
  success: boolean;
  message: string | null;
};

export async function subscribeNewsletterAction(
  _prevState: NewsletterFormState,
  formData: FormData,
): Promise<NewsletterFormState> {
  const parsed = newsletterSubscriberSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Please enter a valid email address.",
      success: false,
      message: null,
    };
  }

  try {
    await prisma.newsletterSubscriber.create({ data: parsed.data });
  } catch (error) {
    // Duplicate signups are an expected case here (unlike the contact
    // form) — treat re-subscribing with the same address as a success,
    // just with a distinct message, rather than an error.
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { error: null, success: true, message: "You're already subscribed — thanks for being here!" };
    }
    throw error;
  }

  return { error: null, success: true, message: "You're on the list — thanks for subscribing!" };
}
