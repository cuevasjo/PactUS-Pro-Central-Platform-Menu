# PactUS Pro CP-2 IAM & Effective Access Integration

## Purpose
CP-2 connects the Central Platform registry to the existing authoritative Phase 27 IAM authorization boundary.

## Authoritative source
The Central Platform consumes Phase 27 access state from the existing authentication/authorization services, including the runtime `/api/auth/me/modules` contract.

Phase 27 remains authoritative for:
- authenticated user identity;
- organization membership;
- active organization state;
- enterprise role identity and status;
- enterprise permissions;
- organization product entitlements;
- individual user product entitlements;
- entitlement status and effective dates;
- trusted vs legacy-transition authorization source.

## Central Platform responsibility
The Central Platform:
1. adapts the Phase 27 module response into a normalized snapshot;
2. maps Phase 27 `contracts` to the LRO product;
3. preserves PFIE and Scout product identity;
4. derives product-level entitlement codes;
5. combines product access with explicit feature/sub-module entitlements;
6. evaluates required permissions;
7. drives navigation visibility;
8. protects registered routes;
9. creates denial/audit metadata.

## Fail-closed behavior
Trusted IAM is required by default.

If the source is `legacy_transition`, centralized protected access is denied unless a future explicitly governed compatibility policy opts out.

A missing required product entitlement is denied.

A suspended, expired, or cancelled product is denied.

A trial product is treated as usable when Phase 27 reports it as subscribed.

A missing feature/sub-module entitlement is denied.

A missing permission is denied.

A disabled lifecycle state is denied.

An unregistered route is denied by the route authorization helper.

## Sub-module entitlement boundary
The current Phase 27 `/api/auth/me/modules` runtime response provides product-level module access and permissions.

The Central Platform supports explicit feature/sub-module entitlements as a separate input because customer subscriptions may include only selected sub-modules.

Until the authoritative backend exposes those feature entitlements, the Central Platform must not infer that every purchased product automatically grants every paid sub-module.

## Navigation rule
Menu visibility is derived from effective access but remains only a presentation control.

Backend/API authorization remains mandatory.

## Product-function preservation
LRO and PFIE function menus remain preserved. CP-2 determines whether a function is visible/accessible; it does not delete the function inventory.

## Auditability
Access decisions can produce structured audit metadata containing:
- organization;
- user;
- enterprise role;
- authorization source;
- resource type/id;
- allow/deny decision;
- denial reason;
- missing entitlement(s);
- missing permission(s).

## Automated coverage
CP-2 automated tests cover:
- trusted IAM allow path;
- missing feature entitlement;
- missing enterprise permission;
- non-entitled product;
- suspended product;
- expired product;
- cancelled product;
- trial product;
- disabled lifecycle state;
- unregistered route;
- legacy-transition fail-closed behavior;
- explicitly governed compatibility mode;
- global navigation filtering;
- product-function visibility;
- access audit metadata.

## Certification criteria
CP-2 is certified only when all of the following pass on the controlled CP-2 head:
1. TypeScript typecheck;
2. CP-1 registry validation;
3. CP-1 registry tests;
4. CP-2 access tests;
5. combined `npm run ci`;
6. `git diff --check`;
7. clean tracked working tree;
8. CP-1 certified commit remains an ancestor.

## Production note
CP-2 is an integration foundation. It does not modify the Phase 27 repository or claim that sub-module entitlement APIs are already available there.

Production readiness of the entire Central Platform is not claimed by CP-2 alone.
