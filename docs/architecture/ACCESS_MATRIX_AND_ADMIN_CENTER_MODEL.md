# PactUS Pro Access Matrix and Admin Center Model

## Status
CP-0 governance specification.

## Purpose
This document defines how PactUS Pro administrators view and manage organization access across products, sub-modules, roles, permissions, service entitlements, support tiers, and user-level assignments.

## 1. Administrative principle
The Admin Center is the authoritative management surface for organization-level configuration, but it does not replace the underlying IAM, billing, entitlement, or authorization services.

The interface must present authoritative state from those services and must not create parallel access logic.

## 2. Access matrix

The Admin Center should support an organization/user access matrix similar to:

```text
User              LRO   PFIE   Scout   JD   Grievances   Benefits   Time   Support
----------------------------------------------------------------------------------
User A             yes    yes     no    yes      no         no      yes    Priority
User B             yes     no     no    yes     yes         no       no    Essential
User C              no    yes    yes     no      no        yes      yes    Premier
```

The matrix should support:
- product-level access;
- sub-module/feature access;
- enterprise role;
- relevant permission summary;
- support/service entitlements;
- account status;
- invitation status;
- optional effective/expiration dates.

## 3. Organization purchase boundary

The organization may only assign capabilities it is entitled to use.

```text
Organization purchase
        ↓
Organization entitlement
        ↓
User entitlement
        ↓
Role permissions
        ↓
Effective user access
```

An organization subscription does not automatically grant all users access.

## 4. User assignment workflow

Authorized administrators should be able to:
1. invite a user;
2. assign an enterprise role;
3. assign one or more entitled products;
4. assign eligible sub-modules/features;
5. assign supported authentication methods where policy permits;
6. assign optional service entitlements;
7. review effective access before activation;
8. modify or revoke access later;
9. preserve audit history for all material changes.

## 5. Admin Center information architecture

```text
Administration
|
+-- Organization
|   +-- Profile
|   +-- Branding
|   +-- Localization
|   +-- Time zone
|
+-- Users & Access
|   +-- Users
|   +-- Invitations
|   +-- Roles
|   +-- Permissions
|   +-- Access Matrix
|   +-- Product Entitlements
|   +-- Sub-module Entitlements
|
+-- Subscriptions & Billing
|   +-- Products Purchased
|   +-- Add-ons
|   +-- Seats
|   +-- Usage
|   +-- Billing
|   +-- Renewal
|
+-- Authentication & Security
|   +-- MFA Policy
|   +-- Authentication Methods
|   +-- SSO / SAML / OIDC
|   +-- Google
|   +-- Microsoft
|   +-- Sessions
|   +-- Recovery
|
+-- Support & Services
|   +-- Support Plan
|   +-- Authorized Support Contacts
|   +-- SLA Configuration
|   +-- Tickets
|   +-- Escalation Contacts
|   +-- Service Credits
|   +-- Training Credits
|
+-- Training
|   +-- Entitled Training
|   +-- Complimentary Hours
|   +-- Training History
|
+-- Customer Experience
|   +-- Support Surveys
|   +-- Sales Surveys
|   +-- Implementation Surveys
|   +-- Training Surveys
|   +-- CSAT
|   +-- NPS
|   +-- CES
|
+-- Audit
    +-- Access Changes
    +-- Security Events
    +-- Subscription Changes
    +-- Support / SLA Events
    +-- Credit Adjustments
```

## 6. Permission-aware administration

Administrative screens themselves must be permission-protected.

Example permission families:

```text
admin.users.manage
admin.roles.manage
admin.permissions.manage
admin.entitlements.manage
admin.support.manage
admin.training.manage
admin.surveys.view
admin.surveys.manage
admin.audit.view
billing.payment.manage
```

The exact registry should extend the governed Phase 27 permission model.

## 7. Authorized support contacts

Organizations should be able to designate users who may open or manage support cases.

Possible policies:
- all active users may open standard help requests;
- only authorized contacts may open Priority/Premier technical cases;
- only administrators may request billing/account changes;
- emergency support privileges may be independently assigned.

## 8. Localization

All Admin Center labels, statuses, forms, and notifications must use the shared localization framework.

Initial languages:
- English
- Spanish

The access matrix itself must remain data-driven so translations do not alter the underlying identifiers.

## 9. Audit requirements

Material administrative actions should generate immutable audit events containing:
- organization ID;
- actor user ID;
- affected user or resource;
- action;
- prior state;
- resulting state;
- timestamp;
- correlation/request ID;
- optional reason;
- source UI/API.

## 10. Security rules
- UI visibility never substitutes for backend authorization.
- Cross-tenant administration is prohibited unless explicitly supported by a governed PactUS internal role.
- Service/support entitlements must not imply product access.
- Product access must not imply administrative access.
- Role names alone must not be treated as authorization decisions.

## 11. Phase 28–31 compatibility
Each phase repository may display or consume effective access but should not create its own competing user-access matrix. The central Admin Center is the canonical management experience.
