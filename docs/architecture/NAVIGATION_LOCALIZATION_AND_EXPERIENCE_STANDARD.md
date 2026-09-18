# PactUS Pro Navigation, Localization, and Experience Standard

## 1. Central navigation rule
Every destination has one canonical navigation location.

Home may surface status and activity, but should not reproduce entire Help, Support, Training, Improvement, or module menus.

## 2. Recommended global navigation

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

## 3. Global top bar
The top bar should provide:
- global search;
- active Time & Billing timer;
- contextual Help button;
- notifications;
- language selector;
- organization/user controls.

The active timer is allowed in the top bar even though Time & Billing also exists in navigation because one is a global control and the other is a destination.

## 4. Experience Center

```text
Experience Center
|
+-- Help & Knowledge Base
+-- Training
+-- Technical Support
|   +-- Open Ticket
|   +-- My Tickets
|   +-- Organization Tickets (authorized roles)
|   +-- Support Plan / SLA
|
+-- Improvements & Feedback
|   +-- Report a Challenge
|   +-- Suggest Improvement
|   +-- Request Feature
|   +-- My Requests
|
+-- Surveys
|   +-- Technical Support Survey
|   +-- Sales & Implementation Survey
|   +-- Training Survey
|
+-- What's New
```

## 5. Localization
Localization is a platform requirement, not a module-specific enhancement.

Initial supported languages:
- English
- Spanish

Architecture must support additional languages without changing business logic.

Required behavior:
- organization default language;
- user preferred language override;
- stable translation keys;
- locale-aware dates, times, currencies, numbers, percentages, and plurals;
- translated notifications;
- translated support/ticket statuses;
- multilingual knowledge-base and training metadata;
- multilingual surveys;
- preservation of original support-ticket text when AI translation is provided;
- HTML language/direction metadata;
- future RTL readiness.

## 6. Contextual help
The top-bar Help action may show contextual guidance based on the active module/screen but should link back to the canonical Experience Center for full resources.

## 7. Support tiers
Support plans are service entitlements.

Initial conceptual tiers:
- Essential: initial response target within 72 hours.
- Priority: initial response target within 24 hours.
- Premier: initial response target within 3 hours.

Final contractual language, coverage windows, severity matrices, exclusions, and maximum remedies must be configuration-driven and approved before production sale.

## 8. SLA engine
The support system should calculate SLA deadlines from:
- support plan;
- incident severity;
- coverage calendar;
- business hours;
- applicable exclusions.

SLA workflow should support:
- reminders;
- escalation thresholds;
- potential breach detection;
- qualifying-breach review;
- audit records;
- customer notification.

## 9. SLA remedies
Qualifying SLA breaches may support configurable remedies:
- account/service credit;
- invoice discount;
- support-plan extension;
- complimentary training hours;
- administrator/product-specialist training;
- customer success review.

The system should not automatically issue financial compensation solely because a timer reaches zero. Contractual exclusions and qualification rules must be evaluated.

## 10. Technical Support survey
After ticket resolution/closure, an eligible user may receive a localized survey covering:
- overall satisfaction;
- timeliness;
- support quality;
- technical knowledge;
- communication;
- issue resolution;
- ease of obtaining support;
- optional free-text feedback;
- optional NPS/CES metrics.

Survey results should link to ticket metadata without asking the customer to re-enter known information.

## 11. Sales & Implementation survey
Central survey infrastructure should support milestone-triggered feedback after:
- sales process;
- implementation;
- training;
- go-live;
- optional 30/60/90-day adoption checkpoints.

## 12. Improvement workflow
Support tickets, survey responses, or customer feedback may be linked or converted into an improvement/feature request while preserving the original record and audit trail.
