import assert from "node:assert/strict";
import {
  ALL_MODULES,
  ENTITLEMENTS,
  GLOBAL_NAVIGATION,
  LRO_MODULES,
  PFIE_MODULES,
  PRODUCTS,
  SCOUT_MODULES,
  isNavigableLifecycle,
} from "../src/registry/index.js";

assert.equal(PRODUCTS.length, 3);
assert.equal(LRO_MODULES.length, 10);
assert.equal(PFIE_MODULES.length, 9);
assert.equal(SCOUT_MODULES.length, 6);
assert.equal(ALL_MODULES.length, 25);
assert.equal(GLOBAL_NAVIGATION.length, 8);

assert.ok(PRODUCTS.some((p) => p.code === "lro"));
assert.ok(PRODUCTS.some((p) => p.code === "pfie"));
assert.ok(PRODUCTS.some((p) => p.code === "scout"));

assert.ok(
  LRO_MODULES.find((m) => m.id === "lro.job_descriptions")
    ?.requiredEntitlements.includes(ENTITLEMENTS.lro.jobDescriptions),
);

assert.ok(
  LRO_MODULES.find((m) => m.id === "lro.grievances")
    ?.requiredEntitlements.includes(ENTITLEMENTS.lro.grievances),
);

assert.ok(
  PFIE_MODULES.find((m) => m.id === "pfie.benefits")
    ?.requiredEntitlements.includes(ENTITLEMENTS.pfie.benefits),
);

assert.equal(
  LRO_MODULES.find((m) => m.id === "lro.ai_negotiation_copilot")?.lifecycle,
  "coming_soon",
);

assert.equal(isNavigableLifecycle("available"), true);
assert.equal(isNavigableLifecycle("beta"), true);
assert.equal(isNavigableLifecycle("coming_soon"), true);
assert.equal(isNavigableLifecycle("disabled"), false);

for (const module of ALL_MODULES) {
  assert.equal(module.helpContext, module.trainingContext);
  assert.equal(module.helpContext, module.supportContext);
}

console.log("Registry tests passed.");
