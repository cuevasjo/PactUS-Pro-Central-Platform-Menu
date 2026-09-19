import assert from "node:assert/strict";
import { adaptPhase27ModulesResponse } from "../src/access/index.js";
import { PRODUCT_ADAPTERS } from "../src/adapters/index.js";
import { ENTITLEMENTS } from "../src/registry/index.js";
import {
  adapterBoundaryIsSafe,
  assertTenantScope,
  authorizeDirectRoute,
} from "../src/security-integration/index.js";

const snapshot = adaptPhase27ModulesResponse({
  organizationId:"org-a",
  userId:"user-a",
  role:"user",
  locale:"en-US",
  timezone:"America/Chicago",
  authorizationSource:"trusted_iam",
  modules:[
    {module:"contracts",subscribed:true,status:"active",permissions:["lro.view"]},
    {module:"pfie",subscribed:false,status:"not_entitled",permissions:[]},
    {module:"scout",subscribed:false,status:"not_entitled",permissions:[]},
  ],
},{
  featureEntitlements:[ENTITLEMENTS.lro.contracts, ENTITLEMENTS.platform.experience],
});

assert.equal(assertTenantScope(snapshot,{organizationId:"org-a",resourceId:"r1"}),true);
assert.equal(assertTenantScope(snapshot,{organizationId:"org-b",resourceId:"r2"}),false);

assert.equal(authorizeDirectRoute(snapshot,{
  requiredEntitlements:[ENTITLEMENTS.lro.contracts],
  requiredPermissions:["lro.view"],
}),true);

assert.equal(authorizeDirectRoute(snapshot,{
  requiredEntitlements:[ENTITLEMENTS.pfie.scenarios],
  requiredPermissions:["pfie.view"],
}),false);

assert.equal(authorizeDirectRoute(snapshot,{
  requiredPermissions:["admin.users.manage"],
}),false);

assert.equal(authorizeDirectRoute(snapshot,{
  requiredEntitlements:[ENTITLEMENTS.platform.experience],
}),true);

for(const adapter of PRODUCT_ADAPTERS){
  assert.equal(adapterBoundaryIsSafe(adapter),true,adapter.id);
}

const legacySnapshot = adaptPhase27ModulesResponse({
  organizationId:"org-a",
  userId:"user-a",
  role:"user",
  authorizationSource:"legacy_transition",
  modules:[
    {module:"contracts",subscribed:true,status:"active",permissions:["lro.view"]},
    {module:"pfie",subscribed:false,status:"not_entitled",permissions:[]},
    {module:"scout",subscribed:false,status:"not_entitled",permissions:[]},
  ],
});

assert.equal(legacySnapshot.authorizationSource,"legacy_transition");
assert.equal(legacySnapshot.entitlements.size,0);
assert.equal(legacySnapshot.permissions.size,0);
assert.equal(legacySnapshot.productStates.size,0);
assert.equal(authorizeDirectRoute(legacySnapshot,{
  requiredEntitlements:[ENTITLEMENTS.lro.contracts],
  requiredPermissions:["lro.view"],
}),false);

console.log("CP-14 security and integration tests passed.");
