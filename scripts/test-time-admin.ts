import assert from "node:assert/strict";
import { startTimer, pauseTimer, resumeTimer, stopTimer, currentElapsedSeconds } from "../src/time-billing/index.js";
import { buildAccessMatrixRow, visibleAdminNavigation } from "../src/admin/index.js";
import { adaptPhase27ModulesResponse } from "../src/access/index.js";

const context = { organizationId:"o1", userId:"u1", clientId:"c1", matterId:"m1", productCode:"lro", moduleCode:"grievances" };
let timer = startTimer("t1", context, new Date("2026-09-19T00:00:00Z"));
assert.equal(currentElapsedSeconds(timer, new Date("2026-09-19T00:10:00Z")), 600);
timer = pauseTimer(timer, new Date("2026-09-19T00:10:00Z"));
assert.equal(timer.accumulatedSeconds, 600);
timer = resumeTimer(timer, new Date("2026-09-19T00:15:00Z"));
const entry = stopTimer(timer, new Date("2026-09-19T00:20:00Z"));
assert.equal(entry.durationSeconds, 900);
assert.equal(entry.context.matterId, "m1");

const row = buildAccessMatrixRow({
  userId:"u1",email:"u@example.com",displayName:"User",active:true,role:"admin",
  productEntitlements:["product.lro"],featureEntitlements:["lro.grievances"],
  permissions:["admin.users.manage"],supportPlan:"priority"
},["product.lro","lro.grievances","product.pfie"]);
assert.equal(row.cells.find((c)=>c.key==="product.lro")?.enabled,true);
assert.equal(row.cells.find((c)=>c.key==="product.pfie")?.enabled,false);

const snapshot = adaptPhase27ModulesResponse({
  organizationId:"o1",userId:"u1",role:"admin",authorizationSource:"trusted_iam",
  modules:[{module:"contracts",subscribed:true,status:"active",permissions:["admin.users.manage","admin.support.manage","admin.audit.view"]},
  {module:"pfie",subscribed:false,status:"not_entitled",permissions:[]},
  {module:"scout",subscribed:false,status:"not_entitled",permissions:[]}]
},{featureEntitlements:["platform.admin"]});
const adminNav = visibleAdminNavigation(snapshot);
assert.ok(adminNav.some((item)=>item.id==="users_access"));
assert.ok(adminNav.some((item)=>item.id==="support_services"));
assert.ok(adminNav.some((item)=>item.id==="audit"));
assert.ok(!adminNav.some((item)=>item.id==="training"));

console.log("CP-11/12 Time & Billing/Admin tests passed.");
