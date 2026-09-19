export const SUPPORTED_LOCALES = ["en-US", "es-US"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
export type LanguageCode = "en" | "es";

export interface LocaleDefinition {
  locale: SupportedLocale;
  language: LanguageCode;
  label: string;
  nativeLabel: string;
  direction: "ltr" | "rtl";
  fallbackLocale?: SupportedLocale;
}

export type TranslationCatalog = Readonly<Record<string, string>>;

export interface LocalizationContext {
  locale: SupportedLocale;
  language: LanguageCode;
  timeZone?: string;
}
