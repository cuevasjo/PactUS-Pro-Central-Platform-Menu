# PactUS Pro Entitlement and Permission Model

## Purpose
The centralized platform must distinguish authentication, subscription, entitlement, and permission decisions.

## Effective access

```text
Authenticated User
    +
Active Organization Membership
    +
Active Enterprise Role
    +
Role Permissions
    +
Organization Product Entitlement
    +
User Product Entitlement
    +
Sub-module / Feature Entitlement
    +
Lifecycle / Effective-Date Validation
    =
Effective Access
```

## Separation of responsibilities
- Authentication: who the user is.
- Subscription: what the organization purchased.
- Entitlement: which products/features are made available to the organization and user.
- Permission: what the user may do inside an entitled capability.
- Resource authorization: which specific tenant/resource/document/case the action may affect.

## Product examples
Top-level products:
- LRO
- PFIE
- Scout

Example sub-modules:
- LRO Contracts
- Job Descriptions
- Grievances
- Arbitration
- Negotiation
- PFIE Scenarios
- PFIE Benefits
- PFIE Workforce
- PFIE Forecasting
- Scout Search
- Scout Alerts

## Service entitlements
The same entitlement framework must support non-product services:

```text
service.support.essential
service.support.priority
service.support.premier
service.training.standard
service.training.advanced
platform.time
```

## Menu visibility
Menu visibility is derived from effective authorization. Hiding an item is never a security control by itself.

Direct URL and API access must be rejected when authorization fails.

## Access matrix
The Admin Center should expose a governed organization/user access matrix capable of displaying:
- products purchased by the organization;
- sub-modules/features purchased;
- individual user entitlements;
- role;
- relevant permissions;
- support plan;
- optional service entitlements.

## Existing Phase 27 compatibility
The existing Phase 27 IAM, product entitlement, permission, and protected-route logic remain authoritative and should be extended rather than recreated.
