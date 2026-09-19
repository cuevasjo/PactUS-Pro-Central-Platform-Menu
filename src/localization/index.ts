import { EN_US } from "./catalogs/en-US";
import { ES_US } from "./catalogs/es-US";
import { DEFAULT_LOCALE, LOCALES, resolveLocale } from "./locales";
import type { SupportedLocale, TranslationCatalog } from "./types";

export * from "./types";
export * from "./locales";

export const CATALOGS: Record<SupportedLocale, TranslationCatalog> = {
  "en-US": EN_US,
  "es-US": ES_US,
};

export function translate(
  key: string,
  localeInput?: string | null,
  fallback = key,
): string {
  const locale = resolveLocale(localeInput);
  const catalog = CATALOGS[locale];
  const direct = catalog[key];
  if (direct) return direct;

  const fallbackLocale = LOCALES[locale].fallbackLocale ?? DEFAULT_LOCALE;
  return CATALOGS[fallbackLocale][key] ?? fallback;
}

export function formatNumber(
  value: number,
  localeInput?: string | null,
  options?: Intl.NumberFormatOptions,
): string {
  return new Intl.NumberFormat(resolveLocale(localeInput), options).format(value);
}

export function formatCurrency(
  value: number,
  currency: string,
  localeInput?: string | null,
): string {
  return formatNumber(value, localeInput, { style: "currency", currency });
}

export function formatDate(
  value: Date | number | string,
  localeInput?: string | null,
  options: Intl.DateTimeFormatOptions = { dateStyle: "medium" },
): string {
  return new Intl.DateTimeFormat(resolveLocale(localeInput), options).format(
    value instanceof Date ? value : new Date(value),
  );
}
