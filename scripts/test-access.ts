import assert from "node:assert/strict";

import {
  adaptPhase27ModulesResponse,
  authorizeRegisteredRoute,
  resolveEffectiveAccess,
  resolveGlobalNavigation,
  resolveProductFunctionVisibility,
  type Phase27ModulesResponse,
} from "../src/access/index.js";
import { ENTITLEMENTS } from "../src/registry/index.js";

const trustedResponse: Phase27ModulesResponse = {
  organizationId: "org-1",
  userId: "user-1",
  role: "user",
  enterpriseRoleId: "role-pfie",
  enterpriseRoleName: "PFIE Financial Analyst",
  locale: "en",
  timezone: "America/Chicago",
  authorizationSource: "trusted_iam",
  modules: [
    {
      module: "contracts",
      subscribed: false,
      status: "not_entitled",
      permissions: [],
    },
    {
      module: "pfie",
      subscribed: true,
      status: "active",
      permissions: [
        "pfie.view",
        "pfie.run_calculation",
        "pfie.export_report",
      ],
    },
    {
      module: "scout",
      subscribed: false,
      status: "not_entitled",
      permissions: [],
    },
  ],
};

const snapshot = adaptPhase27ModulesResponse(trustedResponse, {
  featureEntitlements: [
    ENTITLEMENTS.pfie.scenarios,
    ENTITLEMENTS.pfie.reporting,
  ],
});

assert.equal(snapshot.authorizationSource, "trusted_iam");
assert.ok(snapshot.entitlements.has("product.pfie"));
assert.ok(!snapshot.entitlements.has("product.lro"));
assert.ok(snapshot.permissions.has("pfie.run_calculation"));

assert.deepEqual(
  resolveEffectiveAccess(snapshot, {
    requiredEntitlements: ["product.pfie", ENTITLEMENTS.pfie.scenarios],
    requiredPermissions: ["pfie.run_calculation"],
  }),
  { allowed: true, reason: "ACCESS_GRANTED" },
);

const missingFeature = resolveEffectiveAccess(snapshot, {
  requiredEntitlements: ["product.pfie", ENTITLEMENTS.pfie.benefits],
  requiredPermissions: ["pfie.view"],
});
assert.equal(missingFeature.allowed, false);
if (!missingFeature.allowed) {
  assert.equal(missingFeature.code, "ENTITLEMENT_REQUIRED");
}

const lroDenied = resolveEffectiveAccess(snapshot, {
  requiredEntitlements: ["product.lro"],
  requiredPermissions: ["lro.view"],
});
assert.equal(lroDenied.allowed, false);
if (!lroDenied.allowed) {
  assert.equal(lroDenied.code, "PRODUCT_NOT_ENTITLED");
}

const nav = resolveGlobalNavigation(snapshot);
assert.equal(nav.find((item) => item.id === "pfie")?.visible, true);
assert.equal(nav.find((item) => item.id === "lro")?.visible, false);
assert.equal(nav.find((item) => item.id === "scout")?.visible, false);

const pfieFunctions = resolveProductFunctionVisibility(snapshot, "pfie");
assert.ok(pfieFunctions.some((entry) => entry.function.id === "pfie.scenario"));

const registered = authorizeRegisteredRoute(snapshot, "/pfie/scenario");
assert.equal(registered.matched, true);
assert.equal(registered.decision.allowed, true);

const untrustedSnapshot = adaptPhase27ModulesResponse({
  ...trustedResponse,
  authorizationSource: "legacy_transition",
});
const untrustedDecision = resolveEffectiveAccess(untrustedSnapshot, {
  requiredEntitlements: ["product.pfie"],
});
assert.equal(untrustedDecision.allowed, false);
if (!untrustedDecision.allowed) {
  assert.equal(untrustedDecision.code, "TRUSTED_IAM_REQUIRED");
}

const suspendedResponse: Phase27ModulesResponse = {
  ...trustedResponse,
  modules: trustedResponse.modules.map((module) =>
    module.module === "pfie"
      ? { ...module, subscribed: true, status: "suspended" }
      : module,
  ),
};
const suspendedSnapshot = adaptPhase27ModulesResponse(suspendedResponse);
const suspendedDecision = resolveEffectiveAccess(suspendedSnapshot, {
  requiredEntitlements: ["product.pfie"],
});
assert.equal(suspendedDecision.allowed, false);
if (!suspendedDecision.allowed) {
  assert.equal(suspendedDecision.code, "PRODUCT_INACTIVE");
}

console.log("Access integration tests passed.");
