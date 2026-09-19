# PactUS Pro CP-14 Security & Integration Certification

## Certified parent
CP-13 certified head: `2112968d9cca02af832a56c43b917a1490659f30`

## Validated security properties
- trusted IAM required;
- legacy transition fails closed;
- product entitlement isolation;
- feature/sub-module entitlement isolation;
- permission enforcement;
- direct-route bypass prevention;
- tenant isolation;
- adapter boundary enforcement;
- Admin permission enforcement;
- Experience entitlement enforcement;
- Time & Billing tenant/product context;
- localization/security regression compatibility.

## Validation evidence
The CP-14 recovery certification gate passed at:
`bd135d4345165e9f6ce89a8b7f5548342b9d7bfc`

Passing checks:
- TypeScript typecheck;
- dedicated CP-14 security/integration tests;
- trusted-IAM fail-closed verification;
- complete registry regression;
- IAM/access regression;
- shell/navigation regression;
- localization regression;
- Experience/Support regression;
- Customer Experience regression;
- Time/Admin regression;
- adapter regression;
- complete test suite;
- complete CI;
- `git diff --check`;
- certified CP-13 ancestry check.

## Recovery note
The initial CP-14 gate exposed an invalid test assumption using an unsupported `legacy` authorization source and expecting an exception. The actual contract uses `legacy_transition` and returns an empty fail-closed authorization snapshot. The test was corrected to validate that behavior directly.

## Certification status
CP-14: CERTIFIED COMPLETE
