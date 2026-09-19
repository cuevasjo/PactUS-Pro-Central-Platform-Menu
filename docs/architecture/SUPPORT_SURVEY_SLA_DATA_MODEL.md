# PactUS Pro Support, Survey, and SLA Data Model

## Status
CP-0 governance specification.

## Purpose
This document defines the conceptual entities and relationships required for centralized technical support, tiered SLA commitments, service remedies, training credits, customer surveys, and improvement workflows.

## 1. Core entities

### SupportPlan
Represents the organization's support-service entitlement.

Suggested fields:
- id
- code
- name
- organizationId or plan catalog reference
- responseTargetPolicy
- coverageCalendar
- businessHoursPolicy
- severityMatrix
- escalationPolicyId
- remedyPolicyId
- status
- effectiveFrom
- effectiveTo

Initial conceptual support plans:
- Essential
- Priority
- Premier

Initial response targets discussed for product design:
- Essential: within 72 hours
- Priority: within 24 hours
- Premier: within 3 hours

These values remain configurable until approved as contractual commitments.

### SupportTicket
Suggested fields:
- id
- organizationId
- requesterUserId
- authorizedContactId
- productCode
- moduleCode
- subModuleCode
- resourceReference
- subject
- description
- severity
- status
- preferredLanguage
- createdAt
- firstResponseAt
- resolvedAt
- closedAt
- assignedTeamId
- assignedAgentId
- correlationId

### SupportSlaInstance
Represents the SLA calculation for a ticket.

Suggested fields:
- id
- ticketId
- supportPlanId
- severity
- coveragePolicySnapshot
- responseTarget
- responseDeadline
- pausedDuration
- exclusionReason
- firstResponseAt
- met
- potentialBreachAt
- qualifiedBreachAt
- reviewedBy
- reviewedAt

### SlaEscalationEvent
Suggested fields:
- id
- slaInstanceId
- threshold
- eventType
- recipient
- createdAt

Common thresholds may include:
- 50 percent
- 75 percent
- 90 percent
- deadline reached

### ServiceRemedy
Represents an approved response to a qualifying SLA breach.

Suggested fields:
- id
- organizationId
- ticketId
- slaInstanceId
- remedyType
- amount
- currency
- trainingHours
- supportExtensionDays
- reason
- approvalStatus
- approvedBy
- issuedAt
- expiresAt

Possible remedy types:
- account_credit
- invoice_discount
- support_extension
- training_hours
- specialist_session
- customer_success_review

### TrainingCreditWallet
Suggested fields:
- organizationId
- availableHours
- consumedHours
- expirationPolicy
- updatedAt

Training credits should preserve source records so complimentary hours granted for an SLA breach can be traced to the qualifying support case.

## 2. Ticket context capture

When a user opens a ticket inside PactUS, the platform may attach non-sensitive diagnostic context:
- organization;
- user;
- enterprise role;
- product/module/sub-module;
- current route;
- application version;
- browser/platform information;
- correlation/request ID;
- support plan;
- locale;
- relevant recent application error identifiers.

Sensitive content must not be attached automatically unless policy explicitly allows it.

## 3. SLA evaluation

```text
Support Ticket
    +
Support Plan
    +
Severity
    +
Coverage Calendar
    +
Business Hours
    +
Contractual Exclusions
    =
SLA Deadline
```

The engine should support paused clocks when contractually appropriate, including waiting for required customer information.

Reaching the deadline creates a potential breach, not automatically a financial remedy.

## 4. Qualifying breach workflow

```text
Potential breach
      ↓
Evaluate exclusions
      ↓
Manager/policy review when required
      ↓
Qualifying breach?
   no       yes
   |         |
record    calculate remedy
             ↓
        approval if required
             ↓
        issue credit/training
             ↓
        customer notification
             ↓
        immutable audit event
```

## 5. Survey model

### SurveyTemplate
Suggested fields:
- id
- code
- surveyType
- status
- triggerPolicy
- audiencePolicy
- defaultLanguage
- version
- createdAt
- updatedAt

Survey types:
- technical_support
- sales
- implementation
- training
- customer_health

### SurveyQuestion
Suggested fields:
- id
- surveyTemplateId
- stableQuestionCode
- responseType
- required
- displayOrder
- metricType
- localizedText

Metric types may include:
- CSAT
- NPS
- CES
- operational quality
- free text

### SurveyInvitation
Suggested fields:
- id
- surveyTemplateId
- organizationId
- userId
- ticketId
- implementationMilestoneId
- preferredLanguage
- status
- sentAt
- expiresAt
- completedAt

### SurveyResponse
Suggested fields:
- id
- invitationId
- surveyTemplateVersion
- organizationId
- userId
- language
- submittedAt

### SurveyAnswer
Suggested fields:
- id
- responseId
- questionCode
- numericValue
- textValue
- choiceValue

Stable question codes must be identical across languages so English and Spanish responses remain analytically comparable.

## 6. Technical Support survey trigger

An eligible support survey may be triggered after:
- ticket resolution;
- ticket closure;
- customer confirmation of resolution;
- other configured support milestone.

Associated operational metadata may include:
- product/module;
- support tier;
- severity;
- SLA target;
- actual first response;
- SLA met/breached;
- assigned team;
- language.

## 7. Sales and Implementation surveys

The survey engine should support triggers at:
- sales completion;
- implementation milestone;
- training completion;
- go-live;
- 30-day adoption;
- 60-day adoption;
- 90-day adoption.

## 8. Low-satisfaction follow-up

Configurable rules may create an internal customer-experience alert when:
- CSAT falls below threshold;
- issue remains unresolved;
- NPS/CES response triggers follow-up;
- free-text sentiment requires review.

The alert may support:
- reopening a ticket;
- creating a follow-up case;
- linking an improvement request;
- assigning customer-success outreach.

AI may assist with summarization or clustering but must not independently determine contractual remedies.

## 9. Improvement request relationship

A support ticket or survey response may be linked to an improvement record.

Suggested relationship:

```text
SupportTicket
      |
      +----> ImprovementRequest

SurveyResponse
      |
      +----> ImprovementRequest
```

Original records remain immutable/auditable.

## 10. Multilingual requirements
- English and Spanish are initial supported languages.
- Original customer text must be preserved.
- AI-assisted translation may be displayed separately.
- Automated emails/notifications should use the recipient's preferred language.
- Survey templates and support status text use stable localization keys.
- Additional languages must be addable without schema redesign.

## 11. Privacy and access
Survey responses, support details, and customer comments require role-aware visibility.

Examples:
- support agents may view assigned support responses;
- implementation teams may view implementation feedback;
- sales leadership may view authorized sales feedback;
- organization administrators may see organization-level support history where permitted;
- cross-customer analytics must avoid exposing another customer's identifiable data.

## 12. Audit events
Material events include:
- ticket opened;
- severity changed;
- assignment changed;
- first response;
- SLA paused/resumed;
- potential breach;
- qualifying breach;
- remedy approved/issued;
- training credit consumed;
- survey sent/completed;
- improvement linked/created.
