export type Theme = "light" | "dark";

export const THEME_COOKIE_NAME = "theme";
export const THEME_MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 1 year
export const DEFAULT_THEME: Theme = "dark";

export function parseTheme(value: string | undefined): Theme {
  return value === "light" ? "light" : DEFAULT_THEME;
}
