# PactUS Pro CP-3 + CP-4 Central Shell & Navigation

## Purpose
CP-3 and CP-4 implement the shared PactUS Pro application shell and entitlement-aware navigation model.

## Global shell
The shell provides one consistent platform frame:
- PactUS Pro branding area;
- central global navigation;
- grouped product-specific function navigation;
- global search;
- persistent Time & Billing control;
- contextual Help;
- language selector;
- organization/user identity area;
- responsive collapse behavior.

## Navigation levels
### Level 1: global navigation
Home, LRO, PFIE, Scout, Time & Billing, Experience Center, Reports & Analytics, and Administration are canonical global destinations. Visibility is derived from effective access.

### Level 2: product-specific navigation
Selecting LRO, PFIE, or Scout preserves the product-specific function menu. Centralization does not flatten the product menu into the global menu.

### Product groups
Product functions are presented in logical groups such as Workspace, Agreements & Documents, Workforce Governance, Cases & Grievances, Bargaining & Negotiation, Workflow, Analysis, Executive Intelligence, Portfolio Strategy, Administration, and Help. Grouping changes presentation, not capability.

## LRO/PFIE preservation
The CP-1 preservation inventory remains authoritative. CP-3/CP-4 may improve grouping, presentation, active state, collapse behavior, and access filtering but may not silently remove working product functions. Automated shell tests protect representative high-value LRO and PFIE functions.

## Time & Billing
Time & Billing has a canonical global destination. An active timer remains visible in the global header because it is a persistent control, not duplicate navigation.

## Help
The header contains one contextual Help control. Full Help, Training, Support, Improvement Requests, and Surveys live under the Experience Center.

## Localization
The shell is structured around localization keys. CP-3/CP-4 includes English/Spanish global navigation and group headings. CP-5 remains responsible for complete localization coverage and governance.

## Branding
The approved PactUS Pro logo is authoritative. The shell currently provides a compact fallback brand slot. The approved binary logo asset must be wired through the governed asset pipeline before production visual certification.

## Security
Menu visibility is derived from CP-2 effective access. The shell is not itself a security boundary. Direct routes and APIs remain protected by authoritative access checks.

## Certification gate
Certification requires certified CP-2 ancestry, strict TypeScript/TSX typecheck, registry validation, access tests, shell/navigation tests, complete CI, clean `git diff --check`, and no tracked working-tree changes.

## Implementation status
CP-3 shell implementation: COMPLETE

CP-4 navigation implementation: COMPLETE

CP-3/CP-4 certification: PENDING FINAL PASS

Full production visual certification: PENDING OFFICIAL LOGO ASSET + CP-5 LOCALIZATION
