import type { LocaleDefinition, SupportedLocale } from "./types";

export const DEFAULT_LOCALE: SupportedLocale = "en-US";

export const LOCALES: Record<SupportedLocale, LocaleDefinition> = {
  "en-US": {
    locale: "en-US",
    language: "en",
    label: "English",
    nativeLabel: "English",
    direction: "ltr",
  },
  "es-US": {
    locale: "es-US",
    language: "es",
    label: "Spanish",
    nativeLabel: "Español",
    direction: "ltr",
    fallbackLocale: "en-US",
  },
};

export function isSupportedLocale(value: string): value is SupportedLocale {
  return value in LOCALES;
}

export function resolveLocale(value?: string | null): SupportedLocale {
  if (!value) return DEFAULT_LOCALE;
  if (isSupportedLocale(value)) return value;
  const normalized = value.toLowerCase();
  if (normalized.startsWith("es")) return "es-US";
  return DEFAULT_LOCALE;
}
