import assert from "node:assert/strict";

import { adaptPhase27ModulesResponse } from "../src/access/index.js";
import {
  buildGlobalShellNavigation,
  buildProductShellNavigation,
  groupProductNavigation,
} from "../src/shell/navigation-model.js";
import { ENTITLEMENTS } from "../src/registry/index.js";

const snapshot = adaptPhase27ModulesResponse(
  {
    organizationId: "org-shell",
    userId: "user-shell",
    role: "user",
    enterpriseRoleName: "Analyst",
    authorizationSource: "trusted_iam",
    modules: [
      {
        module: "contracts",
        subscribed: true,
        status: "active",
        permissions: ["lro.view"],
      },
      {
        module: "pfie",
        subscribed: true,
        status: "active",
        permissions: ["pfie.view", "pfie.run_calculation"],
      },
      {
        module: "scout",
        subscribed: false,
        status: "not_entitled",
        permissions: [],
      },
    ],
  },
  {
    featureEntitlements: [
      ENTITLEMENTS.lro.contracts,
      ENTITLEMENTS.lro.jobDescriptions,
      ENTITLEMENTS.lro.grievances,
      ENTITLEMENTS.pfie.scenarios,
    ],
  },
);

const global = buildGlobalShellNavigation(snapshot, "/pfie/scenario");

assert.ok(global.some((item) => item.id === "lro"));
assert.ok(global.some((item) => item.id === "pfie"));
assert.ok(!global.some((item) => item.id === "scout"));
assert.equal(global.find((item) => item.id === "pfie")?.active, true);

const lro = buildProductShellNavigation(snapshot, "lro", "/contracts/job-descriptions");
assert.ok(lro.some((item) => item.id === "lro.job_descriptions"));
assert.ok(lro.some((item) => item.id === "lro.grievances"));
assert.equal(lro.find((item) => item.id === "lro.job_descriptions")?.active, true);

const pfie = buildProductShellNavigation(snapshot, "pfie", "/pfie/scenario");
assert.ok(pfie.some((item) => item.id === "pfie.scenario"));
assert.equal(pfie.find((item) => item.id === "pfie.scenario")?.active, true);

const groups = groupProductNavigation(pfie);
assert.ok(groups.has("workflow"));
assert.ok(groups.has("analysis"));
assert.ok(groups.has("executive"));
assert.ok(groups.has("portfolio"));
assert.ok(groups.has("administration"));

console.log("Central shell navigation tests passed.");
