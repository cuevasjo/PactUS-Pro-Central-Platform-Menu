import type { ProductArea } from "../shell/types";

export type AdapterCapability =
  | "identity_context"
  | "effective_access"
  | "navigation"
  | "localization"
  | "experience_context"
  | "time_billing"
  | "admin_context";

export interface ExternalRepositoryRef {
  repository: string;
  branch: string;
  relationship: "read_only_contract";
}

export interface ProductAdapterManifest {
  id: string;
  phase: number;
  name: string;
  product: ProductArea;
  external: ExternalRepositoryRef;
  routeNamespace: string;
  capabilities: AdapterCapability[];
  functionIds: string[];
  requiredEntitlements?: string[];
  localizationNamespace: string;
  helpContext: string;
  trainingContext: string;
  supportContext: string;
  timerContextEnabled: boolean;
  status: "ready_for_adapter" | "development" | "transitional";
}

export interface ProductAdapterRuntimeContext {
  organizationId: string;
  userId: string;
  locale: string;
  timezone: string;
  product: ProductArea;
  entitlements: string[];
  permissions: string[];
}

export interface ProductAdapterPayload {
  adapterId: string;
  runtime: ProductAdapterRuntimeContext;
  routeNamespace: string;
  functionIds: string[];
  helpContext: string;
  trainingContext: string;
  supportContext: string;
  timerContextEnabled: boolean;
}
