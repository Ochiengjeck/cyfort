"use server";

import { cookies } from "next/headers";
import { THEME_COOKIE_NAME, THEME_MAX_AGE_SECONDS, type Theme } from "./constants";

export async function setThemeAction(theme: Theme) {
  (await cookies()).set(THEME_COOKIE_NAME, theme, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: THEME_MAX_AGE_SECONDS,
  });
}
