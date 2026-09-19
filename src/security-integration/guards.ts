import type { CentralAuthorizationSnapshot } from "../access/types";
import { resolveEffectiveAccess } from "../access/effective-access";
import type { ProductAdapterManifest } from "../adapters/types";
import type { TenantScopedResource } from "./types";

export function assertTenantScope(
  snapshot: CentralAuthorizationSnapshot,
  resource: TenantScopedResource,
): boolean {
  return snapshot.organizationId === resource.organizationId;
}

export function authorizeDirectRoute(
  snapshot: CentralAuthorizationSnapshot,
  requirements: {
    requiredEntitlements?: string[];
    requiredPermissions?: string[];
  },
): boolean {
  return resolveEffectiveAccess(snapshot, requirements).allowed;
}

export function adapterBoundaryIsSafe(manifest: ProductAdapterManifest): boolean {
  return (
    manifest.external.relationship === "read_only_contract" &&
    manifest.capabilities.includes("effective_access") &&
    manifest.capabilities.includes("localization")
  );
}
