# PactUS Pro CP-11 Global Time & Billing Certification

## Certified parent
CP-8/CP-9/CP-10 certified head: `c9457e8f2641999ac60f706204f5e592c5d1b450`

## Implemented
- global timer context;
- timer start;
- pause;
- resume;
- stop;
- elapsed-time calculation;
- organization/user context;
- client/matter context;
- product/module/resource context;
- billable flag;
- billing code/rate/currency placeholders;
- canonical time-entry output.

## Architectural rule
Time & Billing is a global platform capability.

LRO, PFIE, Scout, and future modules may provide contextual shortcuts, but they must resolve to the same central Time & Billing service rather than creating separate billing timers.

## Production boundaries
Persistence, approval workflow, governed rates, invoice generation, rounding rules, accounting integrations, reporting, and export remain later integration/certification work.

## Certification gate
CP-11 is certified when the controlled branch passes:
- TypeScript typecheck;
- Time/Admin tests;
- complete regression test suite;
- complete CI;
- `git diff --check`.

## Status
CP-11 implementation: COMPLETE

CP-11 certification: PENDING FINAL PASS
