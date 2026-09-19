import { ENTITLEMENTS } from "../registry/entitlements";
import type { ExperienceNavigationItem } from "./types";

export const EXPERIENCE_NAVIGATION: ExperienceNavigationItem[] = [
  {
    id: "experience.help",
    area: "help",
    labelKey: "experience.navigation.help",
    route: "/experience/help",
    requiredEntitlements: [ENTITLEMENTS.platform.experience],
  },
  {
    id: "experience.training",
    area: "training",
    labelKey: "experience.navigation.training",
    route: "/experience/training",
    requiredEntitlements: [ENTITLEMENTS.platform.experience],
  },
  {
    id: "experience.support",
    area: "support",
    labelKey: "experience.navigation.support",
    route: "/experience/support",
    requiredEntitlements: [ENTITLEMENTS.platform.support],
  },
  {
    id: "experience.improvements",
    area: "improvements",
    labelKey: "experience.navigation.improvements",
    route: "/experience/improvements",
    requiredEntitlements: [ENTITLEMENTS.platform.experience],
  },
  {
    id: "experience.surveys",
    area: "surveys",
    labelKey: "experience.navigation.surveys",
    route: "/experience/surveys",
    requiredEntitlements: [ENTITLEMENTS.platform.experience],
  },
  {
    id: "experience.whats_new",
    area: "whats_new",
    labelKey: "experience.navigation.whatsNew",
    route: "/experience/whats-new",
    requiredEntitlements: [ENTITLEMENTS.platform.experience],
  },
];
