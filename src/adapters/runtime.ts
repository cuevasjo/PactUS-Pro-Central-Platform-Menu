import type { CentralAuthorizationSnapshot } from "../access/types";
import type { ProductAdapterManifest, ProductAdapterPayload } from "./types";

export function buildAdapterPayload(
  manifest: ProductAdapterManifest,
  snapshot: CentralAuthorizationSnapshot,
): ProductAdapterPayload {
  return {
    adapterId: manifest.id,
    runtime: {
      organizationId: snapshot.organizationId,
      userId: snapshot.userId,
      locale: snapshot.locale,
      timezone: snapshot.timezone,
      product: manifest.product,
      entitlements: [...snapshot.entitlements],
      permissions: [...snapshot.permissions],
    },
    routeNamespace: manifest.routeNamespace,
    functionIds: [...manifest.functionIds],
    helpContext: manifest.helpContext,
    trainingContext: manifest.trainingContext,
    supportContext: manifest.supportContext,
    timerContextEnabled: manifest.timerContextEnabled,
  };
}

export function adapterHasCapability(
  manifest: ProductAdapterManifest,
  capability: ProductAdapterManifest["capabilities"][number],
): boolean {
  return manifest.capabilities.includes(capability);
}
