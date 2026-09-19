export type AuthorizationSource = "trusted_iam" | "legacy_transition";

export type Phase27ModuleCode = "contracts" | "pfie" | "scout";

export type Phase27ModuleStatus =
  | "active"
  | "trial"
  | "expired"
  | "cancelled"
  | "suspended"
  | "not_entitled"
  | string;

export interface Phase27ModuleAccess {
  module: Phase27ModuleCode;
  subscribed: boolean;
  status: Phase27ModuleStatus;
  permissions: string[];
}

export interface Phase27ModulesResponse {
  organizationId: string;
  userId: string;
  role: string;
  enterpriseRoleId?: string;
  enterpriseRoleName?: string;
  locale?: string;
  timezone?: string;
  authorizationSource: AuthorizationSource;
  modules: Phase27ModuleAccess[];
}

export interface CentralAuthorizationSnapshot {
  organizationId: string;
  userId: string;
  role: string;
  enterpriseRoleId?: string;
  enterpriseRoleName?: string;
  locale: string;
  timezone: string;
  authorizationSource: AuthorizationSource;
  permissions: ReadonlySet<string>;
  entitlements: ReadonlySet<string>;
  productStates: ReadonlyMap<string, {
    subscribed: boolean;
    status: Phase27ModuleStatus;
  }>;
}

export type AccessDenialCode =
  | "TRUSTED_IAM_REQUIRED"
  | "PRODUCT_NOT_ENTITLED"
  | "PRODUCT_INACTIVE"
  | "ENTITLEMENT_REQUIRED"
  | "PERMISSION_REQUIRED"
  | "LIFECYCLE_DISABLED";

export type AccessDecision =
  | {
      allowed: true;
      reason: "ACCESS_GRANTED";
    }
  | {
      allowed: false;
      code: AccessDenialCode;
      reason: string;
      missingEntitlements?: string[];
      missingPermissions?: string[];
    };

export interface AccessRequirement {
  requiredEntitlements?: readonly string[];
  requiredPermissions?: readonly string[];
  lifecycle?: "available" | "beta" | "coming_soon" | "disabled";
}
