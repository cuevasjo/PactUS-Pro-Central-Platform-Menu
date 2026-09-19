# PactUS Pro CP-12 Admin Center Integration

## Scope
The Admin Center is the canonical enterprise-management experience for organization profile, users and access, subscriptions and billing, authentication and security, support and services, training, customer experience, and audit.

## Implemented foundation
The CP-12 foundation includes:
- organization administration data contract;
- user-access row contract;
- centralized access-matrix construction;
- product entitlement visibility;
- feature entitlement visibility;
- permission visibility;
- support-plan visibility;
- permission-aware Admin Center navigation.

## Canonical sections

```text
Administration
├── Organization
├── Users & Access
├── Subscriptions & Billing
├── Authentication & Security
├── Support & Services
├── Training
├── Customer Experience
└── Audit
```

## Authority boundary
The Admin Center does not become a second system of record.

Authoritative data remains owned by the relevant services:
- Phase 27 IAM for identity, membership, roles and permissions;
- entitlement/subscription services for purchased products and features;
- billing services for commercial/account state;
- Support/SLA services for service plans and cases;
- Training services for learning assignments and credits;
- audit services for immutable event history.

The Admin Center is the governed management surface over those authorities.

## Security
Administrative navigation is permission-aware.

Examples include:
- `admin.users.manage`
- `admin.permissions.manage`
- `admin.support.manage`
- `admin.training.manage`
- `admin.surveys.view`
- `admin.audit.view`
- `billing.payment.manage`

UI visibility is never a substitute for backend authorization.

## Access matrix
The access matrix is designed to show, per user:
- active/inactive status;
- enterprise role;
- product entitlements;
- feature/sub-module entitlements;
- selected permissions;
- support plan.

The organization may assign only capabilities it is authorized to provide.

## Localization
All Admin Center labels and statuses must use the shared CP-5 localization architecture.

## Production boundaries
Persistence, real subscription/billing APIs, IAM mutation operations, audit persistence, invitation flows, support-plan changes, and billing transactions are integration work for CP-13 and final validation work for CP-14/CP-15.

## Status
CP-12 implementation foundation: COMPLETE

CP-12 certification: PENDING FINAL PASS
