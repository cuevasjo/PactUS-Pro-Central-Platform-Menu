import {
  ALL_MODULES,
  ENTITLEMENTS,
  GLOBAL_NAVIGATION,
  LIFECYCLE_STATES,
  PRODUCTS,
} from "../src/registry/index.js";

const errors: string[] = [];

function requireUnique(values: string[], label: string): void {
  const seen = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) {
      errors.push(`${label} duplicate: ${value}`);
    }
    seen.add(value);
  }
}

requireUnique(PRODUCTS.map((p) => p.code), "product code");
requireUnique(PRODUCTS.map((p) => p.routeBase), "product route");
requireUnique(ALL_MODULES.map((m) => m.id), "module id");
requireUnique(ALL_MODULES.map((m) => m.routeBase), "module route");
requireUnique(GLOBAL_NAVIGATION.map((n) => n.id), "navigation id");
requireUnique(GLOBAL_NAVIGATION.map((n) => n.route), "navigation route");

const productCodes = new Set(PRODUCTS.map((p) => p.code));
const lifecycleStates = new Set(LIFECYCLE_STATES);

for (const module of ALL_MODULES) {
  if (!productCodes.has(module.product)) {
    errors.push(`module ${module.id} references unknown product ${module.product}`);
  }

  if (!lifecycleStates.has(module.lifecycle)) {
    errors.push(`module ${module.id} has invalid lifecycle ${module.lifecycle}`);
  }

  if (!module.titleKey || !module.descriptionKey) {
    errors.push(`module ${module.id} is missing localization keys`);
  }

  if (!module.helpContext || !module.trainingContext || !module.supportContext) {
    errors.push(`module ${module.id} is missing experience context`);
  }

  const productEntitlement = `product.${module.product}`;
  if (!module.requiredEntitlements.includes(productEntitlement)) {
    errors.push(`module ${module.id} is missing required product entitlement ${productEntitlement}`);
  }

  if (!module.requiredEntitlements.some((code) => code.startsWith(`${module.product}.`))) {
    errors.push(`module ${module.id} is missing submodule entitlement`);
  }
}

for (const nav of GLOBAL_NAVIGATION) {
  if (!nav.labelKey.startsWith("navigation.")) {
    errors.push(`navigation ${nav.id} has invalid localization key ${nav.labelKey}`);
  }
}

const flattenedEntitlements = [
  ...Object.values(ENTITLEMENTS.product),
  ...Object.values(ENTITLEMENTS.lro),
  ...Object.values(ENTITLEMENTS.pfie),
  ...Object.values(ENTITLEMENTS.scout),
  ...Object.values(ENTITLEMENTS.platform),
  ...Object.values(ENTITLEMENTS.service),
];

requireUnique(flattenedEntitlements, "entitlement");

if (errors.length > 0) {
  console.error("Registry validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Registry validation passed: ${PRODUCTS.length} products, ${ALL_MODULES.length} modules, ${GLOBAL_NAVIGATION.length} global navigation items, ${flattenedEntitlements.length} entitlement codes.`,
);
