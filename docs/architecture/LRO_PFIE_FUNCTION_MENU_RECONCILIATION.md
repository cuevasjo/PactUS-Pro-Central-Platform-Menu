# LRO and PFIE Function Menu Reconciliation

## Purpose

The Central Platform must not remove product-specific functions while centralizing global navigation.

This document records the first source-backed inventory of the current LRO and PFIE left-pane navigation surfaces and establishes a preservation gate for CP-3/CP-4.

## Core rule

> Centralization may reorganize and improve product navigation, but it must not silently remove a working or intentionally planned product function.

## Sources reviewed

### LRO current platform shell
`pactuspro/pactus-pro`
- `apps/web/components/contracts/lro-sidebar-layout.tsx`
- Existing functions include labor documents, bargaining units, job descriptions, unions, grievances, compliance, external systems, dashboard, inbox, analytics, document workspace, negotiation, intake, approvals, reports, and administration.

### Phase 31 LRO TipTap shell
`pactuspro/Phase-31-lro-v2-Tip-Tap-Improvements`
- `src/components/layout/Sidebar.jsx`
- Current functions include Home, New Contract, E-Learning, Inbox, Analytics, and Admin.
- These remain relevant integration surfaces while Phase 31 continues development.

### PFIE enterprise shell
`pactuspro/pactus-pro`
- `apps/web/components/pfie-enterprise-shell.tsx`
- Current PFIE functions include Workspaces, Upload Data/Intake, Scenarios, Saved Scenarios, Results, Impact Analysis, Employee Audit, Union Classification, Executive Intelligence, Executive Reporting, Demo Center, Command Center, Multi-Union Portfolio, Portfolio Command Center, Cross-Union Simulation, Knowledge Graph, Billable Time, Billable Rates, Audit, Report Center, and User Guide.

## Target navigation model

The centralized shell has two levels:

```text
Global PactUS navigation
        ↓
Product selection
        ↓
Product-specific function menu
```

Example:

```text
PactUS Pro
├── Home
├── LRO
│   ├── Agreements & Documents
│   ├── Workforce Governance
│   ├── Cases / Grievances
│   ├── Bargaining / Negotiation
│   ├── Analytics / Reports
│   └── Product Administration
├── PFIE
│   ├── Workflow
│   ├── Analysis
│   ├── Executive Intelligence
│   ├── Portfolio Strategy
│   ├── Administration
│   └── Help / Training
├── Scout
├── Time & Billing
├── Experience Center
├── Reports & Analytics
└── Administration
```

## Improvement goals

The product-specific menus should be improved through:
- consistent grouping;
- clearer active state;
- collapse/expand support;
- permission-aware actions;
- entitlement-aware visibility;
- shared localization;
- contextual Help/Training/Support;
- reduced duplication;
- preserved product-specific depth.

## Important Time & Billing rule

PFIE currently contains Billable Time and Billable Rates in its own navigation.

The future central platform may expose global Time & Billing while preserving PFIE contextual entry points during migration.

A contextual shortcut is not considered harmful duplication when it:
- keeps the user's current PFIE context;
- opens the same canonical Time & Billing service;
- does not create a separate billing implementation.

## CP-3 / CP-4 preservation gate

Before any centralized shell replaces an existing LRO or PFIE sidebar:

1. Inventory the source menu.
2. Map every existing function to a central/product-specific destination.
3. Classify each as preserved, reorganized, merged, contextual shortcut, planned, or intentionally retired.
4. Any retirement requires explicit product-owner approval.
5. Validate direct-route compatibility or provide a governed redirect.
6. Validate entitlement and permission behavior.
7. Validate English and Spanish labels.
8. Validate contextual Help/Training/Support links.
9. Validate Time & Billing continuity.
10. Run regression checks before rollout.

## Current status

Function-preservation architecture: ESTABLISHED

LRO source reconciliation: INITIAL INVENTORY COMPLETE

PFIE source reconciliation: INITIAL INVENTORY COMPLETE

Centralized UI replacement: NOT STARTED

No existing LRO or PFIE product function has been authorized for removal.
