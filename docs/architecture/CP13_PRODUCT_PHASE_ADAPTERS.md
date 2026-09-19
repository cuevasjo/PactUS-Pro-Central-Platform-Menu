# PactUS Pro CP-13 Product / Phase Adapters

## Purpose
CP-13 provides a thin integration boundary between the Central Platform and independently developed PactUS Pro repositories.

## Rule
The Central Platform must not import source code directly from external phase repositories.

Each integration is represented by a governed adapter manifest and runtime payload.

## Current adapter mappings

### Phase 28
Repository: `pactuspro/pactus-pro`
Branch: `phase-28-workforce-governance`
Central product: LRO

### Phase 29
Repository: `pactuspro/Phase-29-UCSII-Universal-Capital-Strategic-Investment-Impact-Engine`
Branch: `phase-29-ucsii-development`
Central product: PFIE

### Phase 30
Repository: `pactuspro/Phase-30-Health-Insurance-Comparison-Module`
Branch: `phase-30-central-platform-ready-certified-2026-09-18`
Central product: PFIE

### Phase 31
Repository: `pactuspro/Phase-31-lro-v2-Tip-Tap-Improvements`
Branch: `main`
Central product: LRO

## Shared integration context
Adapters may consume:
- authenticated user identity;
- organization context;
- effective entitlements;
- effective permissions;
- locale;
- time zone;
- product identity;
- navigation function identifiers;
- Help/Training/Support context;
- global Time & Billing context.

## Repository independence
External repository relationship is read-only from the Central Platform repository.

CP-13 does not:
- merge external repositories;
- copy their business logic;
- modify their branches;
- require one external phase repository to build another;
- create a second IAM or localization system.

## Function preservation
Adapter manifests reference the CP-1 function-preservation registry. Unknown function IDs fail validation.

## Integration maturity
Adapters can be marked:
- ready_for_adapter;
- development;
- transitional.

This allows independent repositories to continue development without blocking the Central Platform contract.

## Production boundary
Real runtime mounting/remote-module delivery/API gateway composition is environment-specific integration work and is subject to CP-14/CP-15 security and production validation.

## Status
CP-13 contract adapter implementation: COMPLETE
Certification: PENDING FINAL PASS
