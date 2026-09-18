export * from "./types";
export * from "./entitlements";
export * from "./permissions";
export * from "./products";
export * from "./navigation";
export * from "./lifecycle";

export { LRO_MODULES } from "./modules/lro";
export { PFIE_MODULES } from "./modules/pfie";
export { SCOUT_MODULES } from "./modules/scout";

import { LRO_MODULES } from "./modules/lro";
import { PFIE_MODULES } from "./modules/pfie";
import { SCOUT_MODULES } from "./modules/scout";

export const ALL_MODULES = [
  ...LRO_MODULES,
  ...PFIE_MODULES,
  ...SCOUT_MODULES,
] as const;
