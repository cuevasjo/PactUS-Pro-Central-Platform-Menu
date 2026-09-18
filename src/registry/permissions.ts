export const PERMISSIONS = {
  lro: {
    view: "lro.view",
    create: "lro.create",
    edit: "lro.edit",
    approve: "lro.approve",
    export: "lro.export",
    manage: "lro.manage",
  },
  pfie: {
    view: "pfie.view",
    uploadTemplate: "pfie.upload_template",
    runCalculation: "pfie.run_calculation",
    exportReport: "pfie.export_report",
    manageCustomDrivers: "pfie.manage_custom_drivers",
    viewPortfolioDashboard: "pfie.view_portfolio_dashboard",
    demoManage: "pfie.demo.manage",
  },
  scout: {
    view: "scout.view",
    configureAlerts: "scout.configure_alerts",
    manageEntities: "scout.manage_entities",
    exportOpportunities: "scout.export_opportunities",
  },
  time: {
    view: "platform.time.view",
    create: "platform.time.create",
    edit: "platform.time.edit",
    approve: "platform.time.approve",
    manage: "platform.time.manage",
    reports: "platform.time.reports",
  },
  admin: {
    usersManage: "admin.users.manage",
    rolesManage: "admin.roles.manage",
    permissionsManage: "admin.permissions.manage",
    entitlementsManage: "admin.entitlements.manage",
    supportManage: "admin.support.manage",
    trainingManage: "admin.training.manage",
    surveysView: "admin.surveys.view",
    surveysManage: "admin.surveys.manage",
    auditView: "admin.audit.view",
  },
} as const;

type NestedValue<T> = T extends string
  ? T
  : T extends Record<string, unknown>
    ? NestedValue<T[keyof T]>
    : never;

export type PermissionCode = NestedValue<typeof PERMISSIONS>;
