import type { CentralAuthorizationSnapshot } from "../../access/types";
import { resolveEffectiveAccess } from "../../access/effective-access";
import type { TrainingResource } from "../types";

export function visibleTrainingResources(
  snapshot: CentralAuthorizationSnapshot,
  resources: readonly TrainingResource[],
): TrainingResource[] {
  return resources.filter((resource) => {
    if (resource.lifecycle === "archived") return false;

    if (
      resource.productCodes.length > 0 &&
      !resource.productCodes.some((product) =>
        snapshot.entitlements.has(`product.${product}`),
      )
    ) {
      return false;
    }

    const decision = resolveEffectiveAccess(snapshot, {
      requiredEntitlements: resource.requiredEntitlements,
      requiredPermissions: resource.requiredPermissions,
    });

    return decision.allowed;
  });
}

export function filterTrainingResources(
  resources: readonly TrainingResource[],
  options: {
    query?: string;
    contentType?: TrainingResource["contentType"];
    tag?: string;
  } = {},
): TrainingResource[] {
  const query = options.query?.trim().toLowerCase();

  return resources.filter((resource) => {
    if (options.contentType && resource.contentType !== options.contentType) return false;
    if (options.tag && !resource.tags.includes(options.tag)) return false;
    if (!query) return true;

    return (
      resource.id.toLowerCase().includes(query) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(query)) ||
      resource.titleKey.toLowerCase().includes(query) ||
      resource.descriptionKey.toLowerCase().includes(query)
    );
  });
}
