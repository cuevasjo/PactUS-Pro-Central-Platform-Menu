# PactUS Pro Training / E-Learning Preservation & Design Reference

## Status
Planning contract for CP-6 Experience Center / Training.

## Purpose
PactUS Pro already has an E-Learning resource experience that should be preserved and improved as part of the centralized Experience Center.

The centralized Training area must not reduce the current resource-discovery experience to a generic static help page.

## Existing E-Learning concepts to preserve

The current reference experience includes:

- E-Learning Resources landing page;
- total resource count;
- team-member summary;
- resource search;
- category filtering;
- resource-type filtering;
- resource cards;
- resource type labels;
- category/topic labels;
- tags;
- estimated completion/read/watch time;
- author/instructor attribution;
- ratings;
- view counts;
- View action;
- downloadable-resource action where applicable.

## Initial reference topics

The current reference catalog includes examples such as:

1. Contract Law Fundamentals
2. Negotiation Strategies for Business Contracts
3. Understanding Intellectual Property Rights
4. Digital Contract Management Best Practices
5. Risk Management in Contract Agreements
6. International Contract Law Overview
7. Contract Drafting Templates and Examples
8. Compliance and Regulatory Requirements

These examples are references for the Training catalog taxonomy and should not be treated as the complete future catalog.

## Centralized destination

The canonical destination should be:

```text
Experience Center
└── Training
    ├── Learning Catalog
    ├── My Training
    ├── Assigned Training
    ├── Learning Paths
    ├── Completed Training
    ├── Certifications
    └── Training Credits
```

## Subscription-aware delivery

Training content should be filtered by the user's effective product and feature entitlements.

Examples:

### LRO
- Contract Management
- TipTap / Collaborative Editor
- Contract Drafting
- Labor Documents
- Bargaining Units
- Job Descriptions
- Grievances
- Arbitration
- Negotiation
- Compliance
- Reports / Analytics

### PFIE
- Data Intake
- Scenario Modeling
- Saved Scenarios
- Impact Analysis
- Employee Cost Audit
- Benefits Intelligence
- Workforce Analytics
- Forecasting
- Cross-Union Simulation
- Executive Intelligence
- Portfolio Strategy
- Reporting

### Scout
- Search
- Monitoring
- Alerts
- Entity Management
- Competitive Intelligence
- Export / Reporting

### Administration
- User Management
- Roles / Permissions
- MFA
- Authentication Methods
- Entitlements
- Support Plan
- Audit
- Localization

Training visibility must not grant product access. It may optionally expose selected public/preview training when product policy permits.

## Role-aware training

Training may also be targeted by:
- organization;
- enterprise role;
- user;
- industry;
- product;
- sub-module;
- implementation stage;
- customer-success plan;
- support tier.

## Training content types

The centralized catalog should support:
- video;
- article;
- book / guide;
- blog;
- downloadable resource;
- template;
- interactive practice;
- quiz / knowledge check;
- guided walkthrough;
- certification course.

## Training metadata

A training resource should support:

```ts
type TrainingResource = {
  id: string;
  titleKey: string;
  descriptionKey: string;
  contentType: string;
  productCodes: string[];
  moduleCodes?: string[];
  requiredEntitlements?: string[];
  requiredPermissions?: string[];
  industries?: string[];
  roles?: string[];
  tags: string[];
  estimatedMinutes?: number;
  authorName?: string;
  rating?: number;
  viewCount?: number;
  downloadable?: boolean;
  required?: boolean;
  certificationEligible?: boolean;
  lifecycle: 'available' | 'beta' | 'archived';
};
```

## Learning paths

The Training Center should support structured learning paths such as:

```text
LRO Administrator Onboarding
1. PactUS Pro Overview
2. Contracts
3. TipTap Collaborative Editing
4. User Access
5. Job Descriptions
6. Grievances
7. Negotiation
8. Reports
9. Security / MFA
10. Certification
```

and:

```text
PFIE Financial Analyst
1. PFIE Overview
2. Data Intake
3. Scenario Modeling
4. Employee Cost Analysis
5. Benefits
6. Workforce Analytics
7. Forecasting
8. Cross-Union Simulation
9. Executive Reporting
10. Certification
```

## SLA / complimentary training integration

Training must integrate with the CP-8 service-remedy model.

An organization may receive complimentary training hours because of:
- qualifying SLA breach;
- implementation remediation;
- customer-success intervention;
- promotional entitlement;
- contractual training allocation.

Training credits should have an auditable source, available balance, consumption history, and expiration policy.

## Localization requirements

Training is part of the centralized localization architecture.

Initial languages:
- English
- Spanish

The following should use localization keys rather than hard-coded UI text:
- Training navigation;
- search/filter labels;
- resource-type labels;
- categories;
- tags where taxonomy translation is required;
- duration labels;
- status labels;
- assigned/completed indicators;
- certification labels;
- notifications;
- course titles/descriptions when localized versions exist.

Original authored content may remain in its source language while translated versions are stored separately.

## Analytics

Future Training analytics may include:
- resource views;
- completion;
- time spent;
- assigned vs completed;
- learning-path completion;
- certification completion;
- quiz score;
- training-credit consumption;
- product/module demand;
- language;
- organization;
- role.

## CP-6 preservation gate

Before replacing the existing E-Learning experience:

1. Inventory existing training routes and resources.
2. Preserve search and filtering.
3. Preserve resource metadata.
4. Preserve resource-type distinctions.
5. Preserve/download governed resource actions.
6. Map existing content into the centralized Training catalog.
7. Validate subscription-aware visibility.
8. Validate role-aware assignments.
9. Validate English/Spanish behavior.
10. Validate audit/analytics behavior where applicable.
11. Obtain explicit approval before retiring an existing resource or workflow.

## Current status

Existing E-Learning experience: REFERENCE CAPABILITY IDENTIFIED

Central Training information architecture: DEFINED

CP-6 implementation: NOT STARTED

Existing E-Learning functionality removal: NOT AUTHORIZED
