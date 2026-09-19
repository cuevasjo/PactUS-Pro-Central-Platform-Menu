import assert from "node:assert/strict";
import { adaptPhase27ModulesResponse } from "../src/access/index.js";
import {
  PRODUCT_ADAPTERS,
  adapterHasCapability,
  buildAdapterPayload,
  validateAdapterManifest,
} from "../src/adapters/index.js";

assert.equal(PRODUCT_ADAPTERS.length, 4);

const phase28 = PRODUCT_ADAPTERS.find((a) => a.phase === 28);
const phase29 = PRODUCT_ADAPTERS.find((a) => a.phase === 29);
const phase30 = PRODUCT_ADAPTERS.find((a) => a.phase === 30);
const phase31 = PRODUCT_ADAPTERS.find((a) => a.phase === 31);

assert.equal(phase28?.product, "lro");
assert.equal(phase29?.product, "pfie");
assert.equal(phase30?.product, "pfie");
assert.equal(phase31?.product, "lro");

for (const adapter of PRODUCT_ADAPTERS) {
  const validation = validateAdapterManifest(adapter);
  assert.equal(validation.valid, true, validation.errors.join("; "));
  assert.equal(adapter.external.relationship, "read_only_contract");
  assert.equal(adapterHasCapability(adapter, "effective_access"), true);
  assert.equal(adapterHasCapability(adapter, "localization"), true);
  assert.equal(adapterHasCapability(adapter, "experience_context"), true);
}

const snapshot = adaptPhase27ModulesResponse({
  organizationId: "org-adapter",
  userId: "user-adapter",
  role: "user",
  locale: "es-US",
  timezone: "America/Chicago",
  authorizationSource: "trusted_iam",
  modules: [
    { module: "contracts", subscribed: true, status: "active", permissions: ["lro.view"] },
    { module: "pfie", subscribed: true, status: "active", permissions: ["pfie.view"] },
    { module: "scout", subscribed: false, status: "not_entitled", permissions: [] },
  ],
});

const payload = buildAdapterPayload(phase30!, snapshot);
assert.equal(payload.adapterId, "phase30.benefits-intelligence");
assert.equal(payload.runtime.organizationId, "org-adapter");
assert.equal(payload.runtime.locale, "es-US");
assert.equal(payload.runtime.product, "pfie");
assert.equal(payload.timerContextEnabled, true);

console.log("CP-13 product adapter tests passed.");
