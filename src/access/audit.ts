import type { AccessDecision } from "./types";

export interface AccessAuditMetadata {
  organizationId: string;
  userId: string;
  enterpriseRoleId?: string;
  enterpriseRoleName?: string;
  authorizationSource: string;
  resourceType: "navigation" | "module" | "function" | "route" | "action";
  resourceId: string;
  decision: "allowed" | "denied";
  reasonCode: string;
  missingEntitlements?: string[];
  missingPermissions?: string[];
}

export function buildAccessAuditMetadata(params: {
  organizationId: string;
  userId: string;
  enterpriseRoleId?: string;
  enterpriseRoleName?: string;
  authorizationSource: string;
  resourceType: AccessAuditMetadata["resourceType"];
  resourceId: string;
  accessDecision: AccessDecision;
}): AccessAuditMetadata {
  const { accessDecision } = params;

  return {
    organizationId: params.organizationId,
    userId: params.userId,
    enterpriseRoleId: params.enterpriseRoleId,
    enterpriseRoleName: params.enterpriseRoleName,
    authorizationSource: params.authorizationSource,
    resourceType: params.resourceType,
    resourceId: params.resourceId,
    decision: accessDecision.allowed ? "allowed" : "denied",
    reasonCode: accessDecision.allowed
      ? accessDecision.reason
      : accessDecision.code,
    ...(!accessDecision.allowed && accessDecision.missingEntitlements
      ? { missingEntitlements: accessDecision.missingEntitlements }
      : {}),
    ...(!accessDecision.allowed && accessDecision.missingPermissions
      ? { missingPermissions: accessDecision.missingPermissions }
      : {}),
  };
}
