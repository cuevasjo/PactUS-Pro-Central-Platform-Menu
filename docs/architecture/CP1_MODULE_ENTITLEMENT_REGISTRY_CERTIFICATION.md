# PactUS Pro CP-1 Module & Entitlement Registry Certification

## Status
Implementation complete pending final local/CI validation on the certification head.

## Scope completed
CP-1 establishes a governed, type-safe registry for:
- LRO, PFIE, and Scout products;
- product entitlements;
- sub-module entitlements;
- service/platform entitlements;
- permission identifiers;
- module lifecycle states;
- centralized navigation metadata;
- localization keys;
- Help, Training, and Support context;
- LRO/PFIE function-preservation inventory;
- registry aggregation and validation.

## Registry inventory
Current governed inventory:
- Products: 3
- LRO modules: 10
- PFIE modules: 9
- Scout modules: 6
- Total product modules: 25
- Global navigation items: 8
- LRO preserved function entries: 23
- PFIE preserved function entries: 22

## Governance rules validated
The automated validation requires:
1. unique product codes;
2. unique product routes;
3. unique module identifiers;
4. unique module routes;
5. unique navigation identifiers/routes;
6. valid product references;
7. valid lifecycle values;
8. localization keys on every module;
9. Help, Training, and Support context on every module;
10. product-level entitlement on every module;
11. sub-module entitlement on every module;
12. unique entitlement codes;
13. unique product-function identifiers;
14. source provenance on every preserved product function;
15. preservation floors for LRO and PFIE source inventories.

## LRO/PFIE preservation gate
Centralization must not silently remove existing LRO or PFIE functions.

The source-backed preservation inventory includes:
- current PactUS LRO left-pane functions;
- Phase 31 TipTap left-pane functions;
- current PFIE enterprise-shell functions.

Before CP-3/CP-4 replaces a product sidebar, every source function must be classified as preserved, reorganized, merged, contextual shortcut, planned, or explicitly retired with product-owner approval.

## Automated validation
The repository includes:
- TypeScript strict type checking;
- registry integrity validator;
- registry assertions/tests;
- GitHub Actions CP-1 validation workflow.

## Integration boundary
CP-1 does not authenticate users and does not decide effective user access.

CP-2 will integrate this registry with the authoritative Phase 27 IAM, organization membership, role, permission, product entitlement, user entitlement, and lifecycle data.

## Certification gate
CP-1 is certified only after the full CI command passes on the final CP-1 head.

## Implementation status
CP-1 implementation: COMPLETE

CI certification: PENDING FINAL PASS

Production readiness: NOT CLAIMED
