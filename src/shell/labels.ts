import { translate } from "../localization/index";
export function labelFor(key: string, language: "en" | "es"): string {
  return translate(key, language === "es" ? "es-US" : "en-US");
}
