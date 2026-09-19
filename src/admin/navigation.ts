import type { AdminSection } from "./types";

export interface AdminNavigationItem {
  id: AdminSection;
  labelKey: string;
  route: string;
  requiredPermission?: string;
}

export const ADMIN_NAVIGATION: AdminNavigationItem[] = [
  { id: "organization", labelKey: "admin.navigation.organization", route: "/admin/organization" },
  { id: "users_access", labelKey: "admin.navigation.usersAccess", route: "/admin/users-access", requiredPermission: "admin.users.manage" },
  { id: "subscriptions_billing", labelKey: "admin.navigation.subscriptionsBilling", route: "/admin/subscriptions-billing", requiredPermission: "billing.payment.manage" },
  { id: "authentication_security", labelKey: "admin.navigation.authenticationSecurity", route: "/admin/security", requiredPermission: "admin.permissions.manage" },
  { id: "support_services", labelKey: "admin.navigation.supportServices", route: "/admin/support-services", requiredPermission: "admin.support.manage" },
  { id: "training", labelKey: "admin.navigation.training", route: "/admin/training", requiredPermission: "admin.training.manage" },
  { id: "customer_experience", labelKey: "admin.navigation.customerExperience", route: "/admin/customer-experience", requiredPermission: "admin.surveys.view" },
  { id: "audit", labelKey: "admin.navigation.audit", route: "/admin/audit", requiredPermission: "admin.audit.view" },
];
