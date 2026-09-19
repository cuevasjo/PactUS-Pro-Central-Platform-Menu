import assert from "node:assert/strict";
import { PRODUCT_ADAPTERS } from "../src/adapters/index.js";
import { GLOBAL_NAVIGATION, PRODUCT_FUNCTIONS } from "../src/registry/index.js";
import { SUPPORT_PLANS } from "../src/support/index.js";

assert.equal(PRODUCT_ADAPTERS.length, 4);
assert.ok(GLOBAL_NAVIGATION.length >= 8);
assert.ok(PRODUCT_FUNCTIONS.length >= 45);
assert.equal(SUPPORT_PLANS.length, 3);

for (const adapter of PRODUCT_ADAPTERS) {
  assert.equal(adapter.external.relationship, "read_only_contract");
}

assert.ok(PRODUCT_FUNCTIONS.some((fn) => fn.id === "lro.grievances"));
assert.ok(PRODUCT_FUNCTIONS.some((fn) => fn.id === "lro.job_descriptions"));
assert.ok(PRODUCT_FUNCTIONS.some((fn) => fn.id === "pfie.scenario"));
assert.ok(PRODUCT_FUNCTIONS.some((fn) => fn.id === "pfie.executive_intelligence"));
assert.ok(PRODUCT_FUNCTIONS.some((fn) => fn.id === "pfie.billable_time"));

console.log("CP-15 production certification tests passed.");
