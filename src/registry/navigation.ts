import { ENTITLEMENTS } from "./entitlements";
import type { NavigationItem } from "./types";

export const GLOBAL_NAVIGATION: NavigationItem[] = [
  {
    id: "home",
    labelKey: "navigation.home",
    route: "/",
    iconKey: "home",
    lifecycle: "available",
  },
  {
    id: "lro",
    labelKey: "navigation.lro",
    route: "/lro",
    iconKey: "files",
    requiredEntitlements: [ENTITLEMENTS.product.lro],
    lifecycle: "available",
  },
  {
    id: "pfie",
    labelKey: "navigation.pfie",
    route: "/pfie",
    iconKey: "calculator",
    requiredEntitlements: [ENTITLEMENTS.product.pfie],
    lifecycle: "available",
  },
  {
    id: "scout",
    labelKey: "navigation.scout",
    route: "/scout",
    iconKey: "search",
    requiredEntitlements: [ENTITLEMENTS.product.scout],
    lifecycle: "available",
  },
  {
    id: "time-billing",
    labelKey: "navigation.timeBilling",
    route: "/time",
    iconKey: "timer",
    requiredEntitlements: [ENTITLEMENTS.platform.time],
    lifecycle: "available",
  },
  {
    id: "experience-center",
    labelKey: "navigation.experienceCenter",
    route: "/experience",
    iconKey: "life-buoy",
    requiredEntitlements: [ENTITLEMENTS.platform.experience],
    lifecycle: "available",
  },
  {
    id: "reports-analytics",
    labelKey: "navigation.reportsAnalytics",
    route: "/reports",
    iconKey: "bar-chart-3",
    lifecycle: "available",
  },
  {
    id: "administration",
    labelKey: "navigation.administration",
    route: "/admin",
    iconKey: "settings",
    requiredEntitlements: [ENTITLEMENTS.platform.admin],
    lifecycle: "available",
  },
];
