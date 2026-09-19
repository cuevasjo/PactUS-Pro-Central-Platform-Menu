# PactUS Pro Time & Billing and Phase Integration Contract

## 1. Time & Billing as a global capability
Time & Billing is available consistently across entitled PactUS modules and is not owned by LRO, PFIE, or Scout.

## 2. Global timer
An active timer should remain visible in the shared top bar.

The user may:
- start;
- pause;
- resume;
- stop;
- edit permitted timer details.

## 3. Time entry context
Where available, time entries may capture:
- organization;
- user;
- client;
- matter;
- module;
- sub-module;
- document/case/negotiation/scenario reference;
- activity type;
- start time;
- end time;
- duration;
- billable/non-billable status;
- billing code;
- permitted billing rate;
- notes.

## 4. Permissions
The centralized permission catalog should support granular time controls such as:

```text
platform.time.view
platform.time.create
platform.time.edit
platform.time.approve
platform.time.manage
platform.time.reports
```

Existing Phase 27 permission identifiers should be reused or extended through the governed permission registry.

## 5. Integration contract for Phases 28–31
Phase 28, 29, 30, and 31 remain independently developed repositories.

Each phase should integrate with the central platform through a thin adapter that can provide or consume:
- authenticated user identity;
- organization context;
- effective entitlements;
- effective permissions;
- language/locale;
- navigation manifest;
- help/training context;
- support context;
- notification hooks;
- global timer context.

## 6. Prohibited coupling
A phase repository must not require another unfinished phase repository to boot or build.

Examples of prohibited dependencies:
- Phase 28 importing source directly from Phase 31;
- Phase 30 depending on a Phase 29 runtime;
- Phase 31 creating an alternative IAM authority.

## 7. Phase 31 transition
The current Phase 31 LRO application may retain temporary local shell components while development continues, but the following should be treated as transitional integration surfaces:
- local Sidebar;
- local TeamContext mock organization/plan data;
- authentication-only ProtectedRoute behavior;
- standalone navigation definitions.

The TipTap editor itself should not be rewritten solely for central-shell adoption.

## 8. Safe adoption sequence
1. Lock CP-0 contracts.
2. Build CP-1 registry types and validation.
3. Build central shell independently.
4. Integrate one module adapter at a time.
5. Preserve feature behavior.
6. Validate entitlement visibility and direct-route denial.
7. Validate English/Spanish behavior.
8. Validate global timer continuity.
9. Validate Help/Training/Support context.
10. Certify each integration before broader rollout.
