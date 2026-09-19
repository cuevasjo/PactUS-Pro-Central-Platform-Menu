import type { ModuleLifecycle } from "./types";

export const LIFECYCLE_STATES: readonly ModuleLifecycle[] = [
  "available",
  "beta",
  "coming_soon",
  "disabled",
] as const;

export function isNavigableLifecycle(state: ModuleLifecycle): boolean {
  return state === "available" || state === "beta" || state === "coming_soon";
}
