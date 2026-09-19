import { ALL_MODULES, PRODUCT_FUNCTIONS } from "../registry/index";
import { resolveEffectiveAccess } from "./effective-access";
import type {
  AccessDecision,
  CentralAuthorizationSnapshot,
} from "./types";

export interface RouteAuthorizationResult {
  matched: boolean;
  route: string;
  decision: AccessDecision;
  sourceId?: string;
}

export function authorizeRegisteredRoute(
  snapshot: CentralAuthorizationSnapshot,
  route: string,
): RouteAuthorizationResult {
  const exactFunction = PRODUCT_FUNCTIONS.find(
    (entry) => entry.route !== "#" && entry.route === route,
  );

  if (exactFunction) {
    const productEntitlement = `product.${exactFunction.product}`;
    return {
      matched: true,
      route,
      sourceId: exactFunction.id,
      decision: resolveEffectiveAccess(snapshot, {
        requiredEntitlements: [
          productEntitlement,
          ...(exactFunction.requiredEntitlements ?? []),
        ],
        requiredPermissions: exactFunction.requiredPermissions,
        lifecycle: exactFunction.lifecycle === "disabled" ? "disabled" : "available",
      }),
    };
  }

  const module = [...ALL_MODULES]
    .sort((a, b) => b.routeBase.length - a.routeBase.length)
    .find(
      (entry) =>
        route === entry.routeBase || route.startsWith(`${entry.routeBase}/`),
    );

  if (module) {
    return {
      matched: true,
      route,
      sourceId: module.id,
      decision: resolveEffectiveAccess(snapshot, {
        requiredEntitlements: module.requiredEntitlements,
        requiredPermissions: module.requiredPermissions,
        lifecycle: module.lifecycle,
      }),
    };
  }

  return {
    matched: false,
    route,
    decision: {
      allowed: false,
      code: "ENTITLEMENT_REQUIRED",
      reason: "Route is not registered in the Central Platform access registry.",
    },
  };
}
