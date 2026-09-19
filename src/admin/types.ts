export interface AdminUserAccessRow {
  userId: string;
  email: string;
  displayName: string;
  active: boolean;
  role?: string;
  productEntitlements: string[];
  featureEntitlements: string[];
  permissions: string[];
  supportPlan?: string;
}
export interface OrganizationAdminProfile {
  organizationId: string;
  name: string;
  defaultLocale: string;
  timezone: string;
  productsPurchased: string[];
  serviceEntitlements: string[];
  supportPlan?: string;
}
export type AdminSection =
  | "organization"
  | "users_access"
  | "subscriptions_billing"
  | "authentication_security"
  | "support_services"
  | "training"
  | "customer_experience"
  | "audit";
