import type { CentralAuthorizationSnapshot } from "../access/types";

export type ProductArea = "lro" | "pfie" | "scout";

export interface ShellUser {
  name: string;
  email?: string;
  organizationName?: string;
}

export interface ShellContext {
  authorization: CentralAuthorizationSnapshot;
  user: ShellUser;
  activeProduct?: ProductArea;
  activeRoute: string;
  language: "en" | "es";
}

export interface ShellNavigationEntry {
  id: string;
  labelKey: string;
  route: string;
  iconKey?: string;
  group?: string;
  badge?: string;
  visible: boolean;
  disabled?: boolean;
  active?: boolean;
}
