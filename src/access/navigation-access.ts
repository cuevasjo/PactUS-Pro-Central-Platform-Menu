import {
  ALL_MODULES,
  GLOBAL_NAVIGATION,
  PRODUCT_FUNCTIONS,
} from "../registry/index";
import { resolveEffectiveAccess } from "./effective-access";
import type {
  AccessDecision,
  CentralAuthorizationSnapshot,
} from "./types";

export interface ResolvedNavigationItem {
  id: string;
  route: string;
  labelKey: string;
  visible: boolean;
  decision: AccessDecision;
}

export function resolveGlobalNavigation(
  snapshot: CentralAuthorizationSnapshot,
): ResolvedNavigationItem[] {
  return GLOBAL_NAVIGATION.map((item) => {
    const decision = resolveEffectiveAccess(snapshot, {
      requiredEntitlements: item.requiredEntitlements,
      requiredPermissions: item.requiredPermissions,
      lifecycle: item.lifecycle,
    });

    return {
      id: item.id,
      route: item.route,
      labelKey: item.labelKey,
      visible: decision.allowed,
      decision,
    };
  });
}

export function resolveModuleAccess(
  snapshot: CentralAuthorizationSnapshot,
) {
  return ALL_MODULES.map((module) => ({
    module,
    decision: resolveEffectiveAccess(snapshot, {
      requiredEntitlements: module.requiredEntitlements,
      requiredPermissions: module.requiredPermissions,
      lifecycle: module.lifecycle,
    }),
  }));
}

export function resolveProductFunctionVisibility(
  snapshot: CentralAuthorizationSnapshot,
  product: "lro" | "pfie" | "scout",
) {
  const productEntitlement = `product.${product}`;

  return PRODUCT_FUNCTIONS.filter((fn) => fn.product === product).map((fn) => {
    const decision = resolveEffectiveAccess(snapshot, {
      requiredEntitlements: [
        productEntitlement,
        ...(fn.requiredEntitlements ?? []),
      ],
      requiredPermissions: fn.requiredPermissions,
      lifecycle: fn.lifecycle === "disabled" ? "disabled" : "available",
    });

    return {
      function: fn,
      visible: decision.allowed,
      decision,
    };
  });
}
