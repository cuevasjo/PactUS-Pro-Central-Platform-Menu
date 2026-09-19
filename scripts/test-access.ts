import assert from "node:assert/strict";

import {
  adaptPhase27ModulesResponse,
  authorizeRegisteredRoute,
  buildAccessAuditMetadata,
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
assert.equal(snapshot.locale, "en");
assert.equal(snapshot.timezone, "America/Chicago");
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
  assert.ok(missingFeature.missingEntitlements?.includes(ENTITLEMENTS.pfie.benefits));
}

const missingPermission = resolveEffectiveAccess(snapshot, {
  requiredEntitlements: ["product.pfie", ENTITLEMENTS.pfie.scenarios],
  requiredPermissions: ["pfie.manage_custom_drivers"],
});
assert.equal(missingPermission.allowed, false);
if (!missingPermission.allowed) {
  assert.equal(missingPermission.code, "PERMISSION_REQUIRED");
  assert.deepEqual(missingPermission.missingPermissions, ["pfie.manage_custom_drivers"]);
}

const disabledDecision = resolveEffectiveAccess(snapshot, {
  requiredEntitlements: ["product.pfie"],
  lifecycle: "disabled",
});
assert.equal(disabledDecision.allowed, false);
if (!disabledDecision.allowed) {
  assert.equal(disabledDecision.code, "LIFECYCLE_DISABLED");
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
assert.ok(
  pfieFunctions.find((entry) => entry.function.id === "pfie.scenario")?.visible,
);

const registered = authorizeRegisteredRoute(snapshot, "/pfie/scenario");
assert.equal(registered.matched, true);
assert.equal(registered.decision.allowed, true);

const unregistered = authorizeRegisteredRoute(snapshot, "/totally-unknown-route");
assert.equal(unregistered.matched, false);
assert.equal(unregistered.decision.allowed, false);

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

const compatibilitySnapshot = adaptPhase27ModulesResponse(
  {
    ...trustedResponse,
    authorizationSource: "legacy_transition",
  },
  { requireTrustedIam: false },
);
assert.ok(compatibilitySnapshot.entitlements.has("product.pfie"));

const trialSnapshot = adaptPhase27ModulesResponse({
  ...trustedResponse,
  modules: trustedResponse.modules.map((module) =>
    module.module === "pfie"
      ? { ...module, subscribed: true, status: "trial" }
      : module,
  ),
});
assert.ok(trialSnapshot.entitlements.has("product.pfie"));

for (const inactiveStatus of ["suspended", "expired", "cancelled"]) {
  const inactiveResponse: Phase27ModulesResponse = {
    ...trustedResponse,
    modules: trustedResponse.modules.map((module) =>
      module.module === "pfie"
        ? { ...module, subscribed: true, status: inactiveStatus }
        : module,
    ),
  };
  const inactiveSnapshot = adaptPhase27ModulesResponse(inactiveResponse);
  const inactiveDecision = resolveEffectiveAccess(inactiveSnapshot, {
    requiredEntitlements: ["product.pfie"],
  });
  assert.equal(inactiveDecision.allowed, false);
  if (!inactiveDecision.allowed) {
    assert.equal(inactiveDecision.code, "PRODUCT_INACTIVE");
  }
}

const audit = buildAccessAuditMetadata({
  organizationId: snapshot.organizationId,
  userId: snapshot.userId,
  enterpriseRoleId: snapshot.enterpriseRoleId,
  enterpriseRoleName: snapshot.enterpriseRoleName,
  authorizationSource: snapshot.authorizationSource,
  resourceType: "route",
  resourceId: "/pfie/benefits",
  accessDecision: missingFeature,
});

assert.equal(audit.decision, "denied");
assert.equal(audit.reasonCode, "ENTITLEMENT_REQUIRED");
assert.ok(audit.missingEntitlements?.includes(ENTITLEMENTS.pfie.benefits));

console.log("Access integration tests passed.");
