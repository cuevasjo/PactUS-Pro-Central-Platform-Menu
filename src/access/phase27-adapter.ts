import type {
  CentralAuthorizationSnapshot,
  Phase27ModulesResponse,
} from "./types";

const MODULE_TO_PRODUCT = {
  contracts: "lro",
  pfie: "pfie",
  scout: "scout",
} as const;

const ACTIVE_PRODUCT_STATES = new Set(["active", "trial"]);

export interface Phase27AdapterOptions {
  featureEntitlements?: readonly string[];
  requireTrustedIam?: boolean;
}

export function adaptPhase27ModulesResponse(
  response: Phase27ModulesResponse,
  options: Phase27AdapterOptions = {},
): CentralAuthorizationSnapshot {
  if (options.requireTrustedIam !== false && response.authorizationSource !== "trusted_iam") {
    return {
      organizationId: response.organizationId,
      userId: response.userId,
      role: response.role,
      enterpriseRoleId: response.enterpriseRoleId,
      enterpriseRoleName: response.enterpriseRoleName,
      locale: response.locale ?? "en",
      timezone: response.timezone ?? "America/Chicago",
      authorizationSource: response.authorizationSource,
      permissions: new Set(),
      entitlements: new Set(),
      productStates: new Map(),
    };
  }

  const permissions = new Set<string>();
  const entitlements = new Set<string>(options.featureEntitlements ?? []);
  const productStates = new Map<string, { subscribed: boolean; status: string }>();

  for (const moduleAccess of response.modules) {
    const product = MODULE_TO_PRODUCT[moduleAccess.module];
    productStates.set(product, {
      subscribed: moduleAccess.subscribed,
      status: moduleAccess.status,
    });

    if (moduleAccess.subscribed && ACTIVE_PRODUCT_STATES.has(moduleAccess.status)) {
      entitlements.add(`product.${product}`);
      for (const permission of moduleAccess.permissions) permissions.add(permission);
    }
  }

  return {
    organizationId: response.organizationId,
    userId: response.userId,
    role: response.role,
    enterpriseRoleId: response.enterpriseRoleId,
    enterpriseRoleName: response.enterpriseRoleName,
    locale: response.locale ?? "en",
    timezone: response.timezone ?? "America/Chicago",
    authorizationSource: response.authorizationSource,
    permissions,
    entitlements,
    productStates,
  };
}
