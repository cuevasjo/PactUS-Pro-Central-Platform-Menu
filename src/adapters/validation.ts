import { PRODUCT_FUNCTIONS } from "../registry/product-functions";
import type { ProductAdapterManifest } from "./types";

export interface AdapterValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateAdapterManifest(
  manifest: ProductAdapterManifest,
): AdapterValidationResult {
  const errors: string[] = [];
  const knownFunctions = new Set(PRODUCT_FUNCTIONS.map((fn) => fn.id));

  if (!manifest.external.repository) errors.push("repository is required");
  if (!manifest.external.branch) errors.push("branch is required");
  if (manifest.external.relationship !== "read_only_contract") {
    errors.push("external repository relationship must be read_only_contract");
  }
  if (!manifest.routeNamespace.startsWith("/")) {
    errors.push("routeNamespace must start with /");
  }
  if (!manifest.localizationNamespace) errors.push("localizationNamespace is required");
  if (!manifest.helpContext || !manifest.trainingContext || !manifest.supportContext) {
    errors.push("experience contexts are required");
  }

  for (const functionId of manifest.functionIds) {
    if (!knownFunctions.has(functionId)) {
      errors.push(`unknown functionId: ${functionId}`);
    }
  }

  return { valid: errors.length === 0, errors };
}
