export type ProductCode = "lro" | "pfie" | "scout";

export type ModuleLifecycle =
  | "available"
  | "beta"
  | "coming_soon"
  | "disabled";

export interface NavigationItem {
  id: string;
  labelKey: string;
  route: string;
  iconKey?: string;
  requiredEntitlements?: string[];
  requiredPermissions?: string[];
  lifecycle?: ModuleLifecycle;
}

export interface ModuleManifest {
  id: string;
  code: string;
  product: ProductCode;
  titleKey: string;
  descriptionKey: string;
  routeBase: string;
  iconKey: string;
  requiredEntitlements: string[];
  requiredPermissions?: string[];
  lifecycle: ModuleLifecycle;
  navigationItems: NavigationItem[];
  helpContext?: string;
  trainingContext?: string;
  supportContext?: string;
}
