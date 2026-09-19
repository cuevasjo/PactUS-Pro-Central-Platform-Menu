# PactUS Pro CP-2 IAM & Effective Access Certification

## Status
Implementation complete pending final execution of the CP-2 certification gate on the final controlled head.

## Certified parent
CP-1 certified head:

`67951247022971376dc95b4fb11794688c6a60b1`

CP-2 must remain a descendant of this commit.

## Implemented controls
- Phase 27 `/api/auth/me/modules` response adapter;
- trusted IAM required by default;
- product status normalization;
- LRO/PFIE/Scout product entitlement mapping;
- explicit feature/sub-module entitlement input;
- enterprise permission evaluation;
- lifecycle denial;
- global navigation access filtering;
- preserved LRO/PFIE function visibility;
- registered-route authorization;
- fail-closed unknown route behavior;
- denial reason codes;
- structured audit metadata.

## Security model
The Central Platform does not replace Phase 27 IAM.

It consumes Phase 27 authorization state and adds Central Platform registry requirements.

Effective access is granted only when all required layers represented by the trusted authorization snapshot and Central Platform requirement are satisfied.

## Important entitlement rule
Product purchase does not imply automatic access to every future paid sub-module.

Where sub-module entitlements are required, they must be supplied explicitly by an authoritative entitlement source.

## Test coverage
The CP-2 access test suite validates allow and denial paths for:
- trusted IAM;
- legacy-transition state;
- product entitlement;
- active/trial/inactive product states;
- feature entitlement;
- permission requirements;
- lifecycle states;
- navigation visibility;
- product function visibility;
- route authorization;
- audit metadata.

## Certification gate
Required final commands:
- `npm run typecheck`
- `npm run validate:registry`
- `npm run test:registry`
- `npm run test:access`
- `npm test`
- `npm run ci`
- `git diff --check`

## Implementation status
CP-2 implementation: COMPLETE

CP-2 certification: PENDING FINAL PASS

Production readiness: NOT CLAIMED
