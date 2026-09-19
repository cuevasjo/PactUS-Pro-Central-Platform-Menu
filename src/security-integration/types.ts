export type SecurityScenarioCode =
  | "trusted_iam_required"
  | "product_isolation"
  | "feature_isolation"
  | "permission_enforcement"
  | "route_bypass_prevention"
  | "tenant_isolation"
  | "adapter_boundary"
  | "admin_permission"
  | "experience_entitlement"
  | "time_context";

export interface SecurityScenarioResult {
  code: SecurityScenarioCode;
  passed: boolean;
  detail: string;
}

export interface TenantScopedResource {
  organizationId: string;
  resourceId: string;
}
