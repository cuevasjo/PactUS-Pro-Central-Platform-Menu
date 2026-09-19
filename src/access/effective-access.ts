import type {
  AccessDecision,
  AccessRequirement,
  CentralAuthorizationSnapshot,
} from "./types";

export interface ResolveAccessOptions {
  requireTrustedIam?: boolean;
}

export function resolveEffectiveAccess(
  snapshot: CentralAuthorizationSnapshot,
  requirement: AccessRequirement,
  options: ResolveAccessOptions = {},
): AccessDecision {
  if (
    options.requireTrustedIam !== false &&
    snapshot.authorizationSource !== "trusted_iam"
  ) {
    return {
      allowed: false,
      code: "TRUSTED_IAM_REQUIRED",
      reason: "Trusted Phase 27 IAM authorization is required.",
    };
  }

  if (requirement.lifecycle === "disabled") {
    return {
      allowed: false,
      code: "LIFECYCLE_DISABLED",
      reason: "The requested capability is disabled.",
    };
  }

  const requiredEntitlements = requirement.requiredEntitlements ?? [];
  const missingEntitlements = requiredEntitlements.filter(
    (entitlement) => !snapshot.entitlements.has(entitlement),
  );

  if (missingEntitlements.length > 0) {
    const missingProduct = missingEntitlements.find((entry) =>
      entry.startsWith("product."),
    );

    if (missingProduct) {
      const productCode = missingProduct.slice("product.".length);
      const state = snapshot.productStates.get(productCode);

      if (state && state.subscribed && state.status !== "active" && state.status !== "trial") {
        return {
          allowed: false,
          code: "PRODUCT_INACTIVE",
          reason: `Product ${productCode} is not currently active.`,
          missingEntitlements,
        };
      }

      return {
        allowed: false,
        code: "PRODUCT_NOT_ENTITLED",
        reason: `Product ${productCode} is not entitled for this user.`,
        missingEntitlements,
      };
    }

    return {
      allowed: false,
      code: "ENTITLEMENT_REQUIRED",
      reason: "One or more required feature entitlements are missing.",
      missingEntitlements,
    };
  }

  const requiredPermissions = requirement.requiredPermissions ?? [];
  const missingPermissions = requiredPermissions.filter(
    (permission) => !snapshot.permissions.has(permission),
  );

  if (missingPermissions.length > 0) {
    return {
      allowed: false,
      code: "PERMISSION_REQUIRED",
      reason: "One or more required enterprise permissions are missing.",
      missingPermissions,
    };
  }

  return {
    allowed: true,
    reason: "ACCESS_GRANTED",
  };
}
