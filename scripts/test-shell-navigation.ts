import assert from "node:assert/strict";
import { adaptPhase27ModulesResponse } from "../src/access/index.js";
import {
  buildGlobalShellNavigation,
  buildGroupedProductNavigation,
  buildProductShellNavigation,
  groupProductNavigation,
} from "../src/shell/navigation-model.js";
import { labelFor } from "../src/shell/labels.js";
import { ENTITLEMENTS } from "../src/registry/index.js";

const snapshot = adaptPhase27ModulesResponse(
  {
    organizationId: "org-shell", userId: "user-shell", role: "user",
    enterpriseRoleName: "Analyst", authorizationSource: "trusted_iam",
    modules: [
      { module: "contracts", subscribed: true, status: "active", permissions: ["lro.view"] },
      { module: "pfie", subscribed: true, status: "active", permissions: ["pfie.view", "pfie.run_calculation"] },
      { module: "scout", subscribed: false, status: "not_entitled", permissions: [] },
    ],
  },
  {
    featureEntitlements: [
      ENTITLEMENTS.lro.contracts, ENTITLEMENTS.lro.bargainingUnits,
      ENTITLEMENTS.lro.jobDescriptions, ENTITLEMENTS.lro.grievances,
      ENTITLEMENTS.lro.negotiation, ENTITLEMENTS.lro.reports,
      ENTITLEMENTS.pfie.scenarios, ENTITLEMENTS.pfie.employeeCostAnalytics,
      ENTITLEMENTS.pfie.workforce, ENTITLEMENTS.pfie.crossUnionImpact,
      ENTITLEMENTS.pfie.forecasting, ENTITLEMENTS.pfie.executiveDashboard,
      ENTITLEMENTS.pfie.reporting,
    ],
  },
);

const global = buildGlobalShellNavigation(snapshot, "/pfie/scenario");
assert.ok(global.some((item) => item.id === "lro"));
assert.ok(global.some((item) => item.id === "pfie"));
assert.ok(!global.some((item) => item.id === "scout"));
assert.equal(global.find((item) => item.id === "pfie")?.active, true);

const lro = buildProductShellNavigation(snapshot, "lro", "/contracts/job-descriptions");
for (const id of ["lro.job_descriptions", "lro.grievances", "lro.negotiation", "lro.reports"]) {
  assert.ok(lro.some((item) => item.id === id), `Missing preserved LRO function: ${id}`);
}
assert.equal(lro.find((item) => item.id === "lro.job_descriptions")?.active, true);

const pfie = buildProductShellNavigation(snapshot, "pfie", "/pfie/scenario");
for (const id of [
  "pfie.scenario", "pfie.saved_scenarios", "pfie.results", "pfie.impact_analysis",
  "pfie.employee_audit", "pfie.executive_intelligence", "pfie.executive_reporting",
  "pfie.command_center", "pfie.portfolio", "pfie.portfolio_command_center",
  "pfie.cross_union_simulation", "pfie.knowledge_graph", "pfie.billable_time",
  "pfie.billable_rates", "pfie.audit", "pfie.report_center", "pfie.user_guide",
]) {
  assert.ok(pfie.some((item) => item.id === id), `Missing preserved PFIE function: ${id}`);
}
assert.equal(pfie.find((item) => item.id === "pfie.scenario")?.active, true);

const groups = groupProductNavigation(pfie);
for (const group of ["workflow", "analysis", "executive", "portfolio", "administration"]) {
  assert.ok(groups.has(group), `Missing PFIE navigation group: ${group}`);
}
const grouped = buildGroupedProductNavigation(pfie);
assert.equal(grouped.length, groups.size);
assert.ok(grouped.find((group) => group.id === "workflow")?.items.length);
assert.equal(labelFor("navigation.group.workflow", "en"), "Workflow");
assert.equal(labelFor("navigation.group.workflow", "es"), "Flujo de Trabajo");
assert.equal(labelFor("navigation.timeBilling", "es"), "Tiempo y Facturación");

console.log("Central shell navigation tests passed.");
