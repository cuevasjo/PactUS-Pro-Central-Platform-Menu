import {
  resolveGlobalNavigation,
  resolveProductFunctionVisibility,
} from "../access/index";
import type { CentralAuthorizationSnapshot } from "../access/types";
import type {
  ProductArea,
  ShellNavigationEntry,
} from "./types";

export function buildGlobalShellNavigation(
  snapshot: CentralAuthorizationSnapshot,
  activeRoute: string,
): ShellNavigationEntry[] {
  return resolveGlobalNavigation(snapshot)
    .filter((entry) => entry.visible)
    .map((entry) => ({
      id: entry.id,
      labelKey: entry.labelKey,
      route: entry.route,
      visible: true,
      active:
        activeRoute === entry.route ||
        (entry.route !== "/" && activeRoute.startsWith(entry.route + "/")),
    }));
}

export function buildProductShellNavigation(
  snapshot: CentralAuthorizationSnapshot,
  product: ProductArea,
  activeRoute: string,
): ShellNavigationEntry[] {
  return resolveProductFunctionVisibility(snapshot, product)
    .filter((entry) => entry.visible)
    .map(({ function: fn }) => ({
      id: fn.id,
      labelKey: fn.labelKey,
      route: fn.route,
      group: fn.group,
      visible: true,
      disabled: fn.lifecycle === "disabled" || fn.route === "#",
      active:
        fn.route !== "#" &&
        (activeRoute === fn.route || activeRoute.startsWith(fn.route + "/")),
    }));
}

export function groupProductNavigation(entries: ShellNavigationEntry[]) {
  const groups = new Map<string, ShellNavigationEntry[]>();

  for (const entry of entries) {
    const group = entry.group ?? "general";
    const existing = groups.get(group) ?? [];
    existing.push(entry);
    groups.set(group, existing);
  }

  return groups;
}
