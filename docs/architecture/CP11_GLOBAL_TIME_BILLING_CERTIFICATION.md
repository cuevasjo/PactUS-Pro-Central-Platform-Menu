# PactUS Pro CP-11 Global Time & Billing Certification

## Certified parent
CP-8/CP-9/CP-10 certified head: `c9457e8f2641999ac60f706204f5e592c5d1b450`

## Validated implementation
- global timer context;
- start, pause, resume and stop behavior;
- elapsed-time calculation;
- organization/user context;
- client/matter context;
- product/module/resource context;
- billable flag;
- billing code/rate/currency placeholders;
- canonical time-entry output.

## Validation evidence
The combined CP-11/CP-12 certification gate passed at:
`6f54d6af12a371e02a2aab1ecf89588779adbb48`

Passing checks:
- TypeScript typecheck;
- CP-11/CP-12 tests;
- IAM/access regression;
- shell/navigation regression;
- localization regression;
- Experience/Support regression;
- Customer Experience regression;
- complete test suite;
- complete CI;
- `git diff --check`.

## Architectural rule
Time & Billing is a global platform capability. Module shortcuts resolve to the same central service.

## Production boundary
Persistence, approval workflow, governed rates, invoice generation, accounting integrations, exports and final production validation continue through CP-13/CP-14/CP-15.

## Certification status
CP-11: CERTIFIED COMPLETE
