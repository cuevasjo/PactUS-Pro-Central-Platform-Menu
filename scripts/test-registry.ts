import assert from "node:assert/strict";
import {
  ALL_MODULES,
  ENTITLEMENTS,
  GLOBAL_NAVIGATION,
  LRO_FUNCTIONS,
  LRO_MODULES,
  PFIE_FUNCTIONS,
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

const lroIds = new Set(LRO_FUNCTIONS.map((f) => f.id));
assert.ok(lroIds.has("lro.job_descriptions"));
assert.ok(lroIds.has("lro.grievances"));
assert.ok(lroIds.has("lro.negotiation"));
assert.ok(lroIds.has("lro.document_workspace"));
assert.ok(lroIds.has("lro.tiptap.new_contract"));
assert.ok(lroIds.has("lro.tiptap.e_learning"));

const pfieIds = new Set(PFIE_FUNCTIONS.map((f) => f.id));
assert.ok(pfieIds.has("pfie.workspaces"));
assert.ok(pfieIds.has("pfie.scenario"));
assert.ok(pfieIds.has("pfie.saved_scenarios"));
assert.ok(pfieIds.has("pfie.impact_analysis"));
assert.ok(pfieIds.has("pfie.employee_audit"));
assert.ok(pfieIds.has("pfie.executive_intelligence"));
assert.ok(pfieIds.has("pfie.command_center"));
assert.ok(pfieIds.has("pfie.portfolio_command_center"));
assert.ok(pfieIds.has("pfie.cross_union_simulation"));
assert.ok(pfieIds.has("pfie.knowledge_graph"));
assert.ok(pfieIds.has("pfie.billable_time"));
assert.ok(pfieIds.has("pfie.user_guide"));

console.log("Registry tests passed.");
