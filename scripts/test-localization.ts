import assert from "node:assert/strict";
import { GLOBAL_NAVIGATION, PRODUCT_FUNCTIONS } from "../src/registry/index.js";
import {
  CATALOGS,
  formatCurrency,
  formatDate,
  resolveLocale,
  translate,
} from "../src/localization/index.js";

assert.equal(resolveLocale("en-US"), "en-US");
assert.equal(resolveLocale("es"), "es-US");
assert.equal(resolveLocale("es-MX"), "es-US");
assert.equal(resolveLocale("fr-FR"), "en-US");

assert.equal(translate("navigation.home", "en-US"), "Home");
assert.equal(translate("navigation.home", "es-US"), "Inicio");
assert.equal(translate("lro.navigation.grievances", "es-US"), "Quejas Laborales");
assert.equal(translate("pfie.navigation.scenarios", "es-US"), "Escenarios");
assert.equal(translate("missing.key", "es-US"), "missing.key");

const requiredKeys = new Set<string>();
for (const item of GLOBAL_NAVIGATION) requiredKeys.add(item.labelKey);
for (const fn of PRODUCT_FUNCTIONS) requiredKeys.add(fn.labelKey);

for (const [locale, catalog] of Object.entries(CATALOGS)) {
  for (const key of requiredKeys) {
    assert.ok(catalog[key], `Missing ${locale} translation for ${key}`);
  }
}

assert.ok(formatCurrency(1234.5, "USD", "en-US").includes("1,234"));
assert.ok(formatCurrency(1234.5, "USD", "es-US").length > 0);
assert.ok(formatDate("2026-09-18", "en-US").length > 0);
assert.ok(formatDate("2026-09-18", "es-US").length > 0);

console.log("Localization tests passed.");
