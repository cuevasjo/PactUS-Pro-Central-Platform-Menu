import assert from "node:assert/strict";
import { adaptPhase27ModulesResponse } from "../src/access/index.js";
import { ENTITLEMENTS } from "../src/registry/index.js";
import {
  EXPERIENCE_NAVIGATION,
  TRAINING_CATALOG,
  filterTrainingResources,
  visibleTrainingResources,
} from "../src/experience/index.js";
import {
  SUPPORT_PLANS,
  buildSlaPolicy,
  evaluateSla,
  escalationThresholds,
} from "../src/support/index.js";

const snapshot = adaptPhase27ModulesResponse(
  {
    organizationId: "org-exp",
    userId: "user-exp",
    role: "user",
    authorizationSource: "trusted_iam",
    modules: [
      { module: "contracts", subscribed: true, status: "active", permissions: ["lro.view"] },
      { module: "pfie", subscribed: false, status: "not_entitled", permissions: [] },
      { module: "scout", subscribed: false, status: "not_entitled", permissions: [] },
    ],
  },
  {
    featureEntitlements: [
      ENTITLEMENTS.platform.experience,
      ENTITLEMENTS.platform.support,
      ENTITLEMENTS.lro.contracts,
    ],
  },
);

assert.ok(EXPERIENCE_NAVIGATION.some((item) => item.area === "training"));
assert.ok(EXPERIENCE_NAVIGATION.some((item) => item.area === "support"));

const visible = visibleTrainingResources(snapshot, TRAINING_CATALOG);
assert.ok(visible.length >= 8);
assert.ok(visible.some((resource) => resource.id === "training.contract-law-fundamentals"));

const videos = filterTrainingResources(visible, { contentType: "video" });
assert.ok(videos.length >= 2);

const negotiation = filterTrainingResources(visible, { query: "negotiation" });
assert.ok(negotiation.length >= 1);

assert.equal(SUPPORT_PLANS.find((plan) => plan.code === "essential")?.defaultResponseTargetHours, 72);
assert.equal(SUPPORT_PLANS.find((plan) => plan.code === "priority")?.defaultResponseTargetHours, 24);
assert.equal(SUPPORT_PLANS.find((plan) => plan.code === "premier")?.defaultResponseTargetHours, 3);

const premier = SUPPORT_PLANS.find((plan) => plan.code === "premier");
assert.ok(premier);
const policy = buildSlaPolicy(premier!, "normal");
assert.equal(policy.responseTargetHours, 3);

const ticket = {
  id: "t-1",
  organizationId: "org-exp",
  requesterUserId: "user-exp",
  subject: "Unable to access module",
  description: "Test",
  severity: "normal" as const,
  status: "open" as const,
  preferredLocale: "en-US",
  createdAt: "2026-09-18T12:00:00.000Z",
};

const sla = evaluateSla(ticket, policy, new Date("2026-09-18T13:00:00.000Z"));
assert.equal(sla.breached, false);
assert.equal(sla.responseDeadline, "2026-09-18T15:00:00.000Z");

const thresholds = escalationThresholds(new Date(ticket.createdAt), policy);
assert.equal(thresholds.length, 4);
assert.equal(thresholds[3]?.threshold, 1);

console.log("Experience Center and Support/SLA tests passed.");
