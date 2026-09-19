# CP-11 Global Time & Billing

## Scope
Global Time & Billing is a shared PactUS Pro platform service, available across entitled modules.

## Foundation
The implementation provides:
- active timer context;
- start/pause/resume/stop;
- elapsed-time calculation;
- organization/user/client/matter context;
- product/module/resource context;
- billable flag;
- billing code/rate/currency placeholders;
- notes;
- canonical time-entry output.

## Navigation
Time & Billing remains a canonical global destination while the active timer remains visible in the shared header.

Contextual module shortcuts may remain if they resolve into the same central service.

## Production boundaries
Persistence, rate governance, invoice generation, approvals, export, rounding rules, and accounting integrations remain later implementation/integration work.

Status: foundation implemented; certification pending.
