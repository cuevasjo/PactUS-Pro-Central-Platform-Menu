# PactUS Pro Module Manifest Standard

## Purpose
Each PactUS product or sub-module must expose stable metadata that the central platform can use for navigation, entitlement evaluation, localization, help/training context, and lifecycle management.

## Required module fields

```ts
type PactUSModuleManifest = {
  id: string;
  code: string;
  product: 'lro' | 'pfie' | 'scout' | string;
  titleKey: string;
  descriptionKey: string;
  routeBase: string;
  iconKey: string;
  requiredEntitlements: string[];
  requiredPermissions?: string[];
  lifecycle: 'available' | 'beta' | 'coming_soon' | 'disabled';
  navigationItems: PactUSNavigationItem[];
  helpContext?: string;
  trainingContext?: string;
  supportContext?: string;
};
```

## Navigation item

```ts
type PactUSNavigationItem = {
  id: string;
  labelKey: string;
  route: string;
  iconKey?: string;
  requiredEntitlements?: string[];
  requiredPermissions?: string[];
  lifecycle?: 'available' | 'beta' | 'coming_soon' | 'disabled';
};
```

## Naming convention
Entitlement identifiers must be stable and lowercase dot-delimited.

Examples:

```text
lro.contracts
lro.job_descriptions
lro.grievances
lro.negotiation
lro.arbitration

pfie.scenarios
pfie.benefits
pfie.workforce
pfie.forecasting

scout.search
scout.alerts
scout.entities

platform.time
platform.experience
platform.support
platform.admin
```

## Lifecycle behavior
- `available`: may be shown if authorized.
- `beta`: may be shown if the tenant/user is authorized for beta access.
- `coming_soon`: may be shown only when product policy allows discovery.
- `disabled`: never shown to end users.

## Canonical ownership
The manifest describes a module but does not grant access. Access is resolved by the authoritative IAM and entitlement services.

## Phase 28–31 rule
Each active phase repository may continue independent development. When integrated, it must map its routes and capabilities into this manifest format without requiring another phase repository to be present.
