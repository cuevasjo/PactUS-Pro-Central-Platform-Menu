# PactUS Pro Central Platform Architecture

## Status
CP-0 architecture baseline.

## Purpose
The PactUS Pro Central Platform provides the shared enterprise application shell and customer-experience layer used by PactUS modules without duplicating product business logic or the authoritative Phase 27 IAM foundation.

## Architectural principles
1. Phase 27 IAM, Cognito, MFA, organization membership, roles, permissions, and product-entitlement services remain authoritative.
2. LRO, PFIE, Scout, and future modules remain independently developable.
3. Phase 28, 29, 30, and 31 repositories integrate through a stable platform contract rather than direct repository dependencies.
4. Every destination has one canonical navigation location.
5. Menu visibility is entitlement-aware, but backend authorization remains authoritative.
6. The platform shell is multilingual from the beginning.
7. Time & Billing is a global platform capability.
8. Help, Training, Support, Improvement Requests, Surveys, and What's New are centralized in an Experience Center.
9. Customer-facing support commitments are configuration-driven rather than hard-coded.
10. Auditability and tenant isolation apply across all shared services.

## Platform composition

```text
PactUS Pro Central Platform
|
+-- Identity integration
|   +-- Cognito
|   +-- MFA
|   +-- Google / Microsoft / SAML / OIDC
|
+-- Authorization integration
|   +-- Organization membership
|   +-- Enterprise role
|   +-- Functional permissions
|   +-- Organization product entitlements
|   +-- User product entitlements
|   +-- Sub-module / feature entitlements
|
+-- Application shell
|   +-- Central sidebar
|   +-- Global header
|   +-- Search
|   +-- Notifications
|   +-- Organization context
|   +-- Language
|   +-- User profile
|   +-- Active billing timer
|
+-- Product registry
|   +-- LRO
|   +-- PFIE
|   +-- Scout
|   +-- Future products
|
+-- Experience Center
|   +-- Help / Knowledge Base
|   +-- Training
|   +-- Technical Support
|   +-- Improvements / Feature Requests
|   +-- Surveys
|   +-- What's New
|
+-- Time & Billing
|
+-- Reports & Analytics
|
+-- Administration
```

## Initial global navigation

```text
Home
LRO
PFIE
Scout
Time & Billing
Experience Center
Reports & Analytics
Administration
```

Module and sub-module items are shown only when allowed by effective authorization and lifecycle state.

## Centralized shell behavior
The shell owns global navigation and global controls. Product modules own their business workflows and internal screens.

The home page is a dashboard, not a duplicate menu. It may show status, recent activity, tasks, notifications, and What's New, but canonical actions remain in their proper destination.

## Branding
The approved PactUS Pro logo supplied by the product owner is the authoritative brand reference for the centralized shell. The design system must support:
- full logo treatment for login, onboarding, and marketing-adjacent surfaces;
- compact logo treatment for persistent navigation;
- PactUS dark blue as the primary structural color;
- light blue as the supporting brand accent;
- consistent enterprise typography, spacing, surfaces, and accessibility contrast.

## Non-goals for CP-0
CP-0 does not:
- implement the production shell;
- duplicate Cognito or MFA;
- duplicate Phase 27 IAM;
- merge Phase 28–31 repositories;
- rewrite module business logic;
- replace TipTap, PFIE engines, Scout services, or other module-specific runtimes.

## Next phase
CP-1 may begin only after the CP-0 integration contracts are documented and reviewed.
