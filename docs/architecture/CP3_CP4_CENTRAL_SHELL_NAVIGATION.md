# PactUS Pro CP-3 + CP-4 Central Shell & Navigation

## Purpose
CP-3 and CP-4 implement the shared PactUS Pro application shell and entitlement-aware navigation model.

## Global shell
The shell provides one consistent platform frame:
- PactUS Pro branding area;
- central global navigation;
- product-specific function navigation;
- global search;
- persistent Time & Billing control;
- contextual Help;
- language selector;
- organization/user identity area;
- responsive collapse behavior.

## Navigation levels

### Level 1: global navigation
The global menu contains:
- Home
- LRO
- PFIE
- Scout
- Time & Billing
- Experience Center
- Reports & Analytics
- Administration

Visibility is derived from effective access.

### Level 2: product-specific navigation
Selecting LRO, PFIE, or Scout preserves the product-specific function menu.

Centralization does not flatten the product menu into the global menu.

## LRO/PFIE preservation
The CP-1 preservation inventory remains authoritative.

CP-3/CP-4 may improve grouping, presentation, active state, collapse behavior, and access filtering but may not silently remove working product functions.

## Time & Billing
Time & Billing has a canonical global destination.

An active timer remains visible in the global header because it is a persistent control, not duplicate navigation.

Contextual PFIE/LRO billing shortcuts may remain during migration when they resolve into the same canonical billing service.

## Help
The header contains one contextual Help control.

Full Help, Training, Support, Improvement Requests, and Surveys live under the Experience Center rather than being repeated throughout the shell.

## Localization
The shell is structured around localization keys.

CP-3/CP-4 includes the language-control integration point and a minimal English/Spanish label bridge. CP-5 remains responsible for complete localization coverage and governance.

## Branding
The approved PactUS Pro logo is the authoritative visual identity.

The shell currently provides a brand slot/compact fallback mark. The binary approved logo asset must be added to the repository through the governed asset pipeline before production UI certification.

## Security
Menu visibility is derived from CP-2 effective access.

The shell is not itself a security boundary. Direct routes and APIs must remain protected by authoritative access checks.

## Responsive behavior
Desktop:
- full global and product-specific sidebar;
- global header utilities.

Narrow screens:
- compact global navigation;
- product function panel can collapse;
- main workspace remains usable.

## Implementation status
CP-3 shell foundation: IMPLEMENTED
CP-4 navigation foundation: IMPLEMENTED
Full production visual certification: PENDING
