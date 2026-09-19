import {
  resolveGlobalNavigation,
  resolveProductFunctionVisibility,
} from "../access/index";
import type { CentralAuthorizationSnapshot } from "../access/types";
import type {
  ProductArea,
  ShellNavigationEntry,
} from "./types";

export interface ProductNavigationGroup {
  id: string;
  labelKey: string;
  items: ShellNavigationEntry[];
}

const GROUP_LABEL_KEYS: Record<string, string> = {
  general: "navigation.group.general",
  workspace: "navigation.group.workspace",
  agreements: "navigation.group.agreements",
  workforce: "navigation.group.workforce",
  cases: "navigation.group.cases",
  governance: "navigation.group.governance",
  integrations: "navigation.group.integrations",
  analytics: "navigation.group.analytics",
  bargaining: "navigation.group.bargaining",
  operations: "navigation.group.operations",
  tiptap: "navigation.group.tiptap",
  core: "navigation.group.core",
  workflow: "navigation.group.workflow",
  analysis: "navigation.group.analysis",
  executive: "navigation.group.executive",
  training: "navigation.group.training",
  advanced: "navigation.group.advanced",
  portfolio: "navigation.group.portfolio",
  administration: "navigation.group.administration",
  help: "navigation.group.help",
};

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

export function groupProductNavigation(
  entries: ShellNavigationEntry[],
): Map<string, ShellNavigationEntry[]> {
  const groups = new Map<string, ShellNavigationEntry[]>();

  for (const entry of entries) {
    const group = entry.group ?? "general";
    const existing = groups.get(group) ?? [];
    existing.push(entry);
    groups.set(group, existing);
  }

  return groups;
}

export function buildGroupedProductNavigation(
  entries: ShellNavigationEntry[],
): ProductNavigationGroup[] {
  return Array.from(groupProductNavigation(entries).entries()).map(
    ([id, items]) => ({
      id,
      labelKey: GROUP_LABEL_KEYS[id] ?? GROUP_LABEL_KEYS.general,
      items,
    }),
  );
}
