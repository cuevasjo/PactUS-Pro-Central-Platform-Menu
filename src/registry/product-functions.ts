export type ProductFunctionLifecycle =
  | "available"
  | "beta"
  | "planned"
  | "disabled";

export interface ProductFunctionDefinition {
  id: string;
  product: "lro" | "pfie" | "scout";
  group: string;
  labelKey: string;
  route: string;
  lifecycle: ProductFunctionLifecycle;
  source: string;
  requiredEntitlements?: string[];
  requiredPermissions?: string[];
}

export const LRO_FUNCTIONS: ProductFunctionDefinition[] = [
  { id: "lro.home", product: "lro", group: "workspace", labelKey: "lro.navigation.home", route: "/contracts", lifecycle: "available", source: "pactus-pro:lro-sidebar" },
  { id: "lro.labor_documents", product: "lro", group: "agreements", labelKey: "lro.navigation.laborDocuments", route: "/contracts/labor-documents", lifecycle: "available", source: "pactus-pro:lro-sidebar" },
  { id: "lro.bargaining_units", product: "lro", group: "workforce", labelKey: "lro.navigation.bargainingUnits", route: "/contracts/bargaining-units", lifecycle: "available", source: "pactus-pro:lro-sidebar" },
  { id: "lro.job_descriptions", product: "lro", group: "workforce", labelKey: "lro.navigation.jobDescriptions", route: "/contracts/job-descriptions", lifecycle: "available", source: "pactus-pro:lro-sidebar" },
  { id: "lro.unions", product: "lro", group: "workforce", labelKey: "lro.navigation.unions", route: "/contracts/unions", lifecycle: "available", source: "pactus-pro:lro-sidebar" },
  { id: "lro.grievances", product: "lro", group: "cases", labelKey: "lro.navigation.grievances", route: "/contracts/grievances", lifecycle: "available", source: "pactus-pro:lro-sidebar" },
  { id: "lro.compliance", product: "lro", group: "governance", labelKey: "lro.navigation.compliance", route: "/contracts/compliance", lifecycle: "available", source: "pactus-pro:lro-sidebar" },
  { id: "lro.external_systems", product: "lro", group: "integrations", labelKey: "lro.navigation.externalSystems", route: "/contracts/external-systems", lifecycle: "available", source: "pactus-pro:lro-sidebar" },
  { id: "lro.dashboard", product: "lro", group: "workspace", labelKey: "lro.navigation.dashboard", route: "/dashboard", lifecycle: "available", source: "pactus-pro:lro-sidebar" },
  { id: "lro.inbox", product: "lro", group: "workspace", labelKey: "lro.navigation.inbox", route: "/inbox", lifecycle: "available", source: "pactus-pro:lro-sidebar" },
  { id: "lro.analytics", product: "lro", group: "analytics", labelKey: "lro.navigation.analytics", route: "/analytics", lifecycle: "available", source: "pactus-pro:lro-sidebar" },
  { id: "lro.document_workspace", product: "lro", group: "agreements", labelKey: "lro.navigation.documentWorkspace", route: "/workspace/doc-001", lifecycle: "available", source: "pactus-pro:lro-sidebar" },
  { id: "lro.negotiation", product: "lro", group: "bargaining", labelKey: "lro.navigation.negotiation", route: "/negotiation", lifecycle: "available", source: "pactus-pro:lro-sidebar" },
  { id: "lro.intake", product: "lro", group: "workspace", labelKey: "lro.navigation.intake", route: "/intake", lifecycle: "available", source: "pactus-pro:lro-sidebar" },
  { id: "lro.approvals", product: "lro", group: "operations", labelKey: "lro.navigation.approvals", route: "#", lifecycle: "planned", source: "pactus-pro:lro-sidebar" },
  { id: "lro.reports", product: "lro", group: "operations", labelKey: "lro.navigation.reports", route: "/reports", lifecycle: "available", source: "pactus-pro:lro-sidebar" },
  { id: "lro.admin", product: "lro", group: "operations", labelKey: "lro.navigation.admin", route: "/admin", lifecycle: "available", source: "pactus-pro:lro-sidebar" },

  { id: "lro.tiptap.home", product: "lro", group: "tiptap", labelKey: "navigation.home", route: "/dashboard", lifecycle: "available", source: "phase31:sidebar" },
  { id: "lro.tiptap.new_contract", product: "lro", group: "tiptap", labelKey: "navigation.newContract", route: "/new-contract", lifecycle: "available", source: "phase31:sidebar" },
  { id: "lro.tiptap.e_learning", product: "lro", group: "tiptap", labelKey: "navigation.eLearning", route: "/e-learning", lifecycle: "available", source: "phase31:sidebar" },
  { id: "lro.tiptap.inbox", product: "lro", group: "tiptap", labelKey: "navigation.inbox", route: "/inbox", lifecycle: "available", source: "phase31:sidebar" },
  { id: "lro.tiptap.analytics", product: "lro", group: "tiptap", labelKey: "navigation.analytics", route: "/analytics", lifecycle: "available", source: "phase31:sidebar" },
  { id: "lro.tiptap.admin", product: "lro", group: "tiptap", labelKey: "navigation.admin", route: "/admin", lifecycle: "available", source: "phase31:sidebar" }
];

export const PFIE_FUNCTIONS: ProductFunctionDefinition[] = [
  { id: "pfie.home", product: "pfie", group: "core", labelKey: "pfie.navigation.home", route: "/pfie", lifecycle: "available", source: "pactus-pro:pfie-enterprise-shell" },
  { id: "pfie.workspaces", product: "pfie", group: "workflow", labelKey: "pfie.navigation.workspaces", route: "/pfie/workspaces", lifecycle: "available", source: "pactus-pro:pfie-enterprise-shell" },
  { id: "pfie.intake", product: "pfie", group: "workflow", labelKey: "pfie.navigation.uploadData", route: "/pfie/intake", lifecycle: "available", source: "pactus-pro:pfie-enterprise-shell" },
  { id: "pfie.scenario", product: "pfie", group: "workflow", labelKey: "pfie.navigation.scenarios", route: "/pfie/scenario", lifecycle: "available", source: "pactus-pro:pfie-enterprise-shell" },
  { id: "pfie.saved_scenarios", product: "pfie", group: "workflow", labelKey: "pfie.navigation.savedScenarios", route: "/pfie/saved-scenarios", lifecycle: "available", source: "pactus-pro:pfie-enterprise-shell" },
  { id: "pfie.results", product: "pfie", group: "workflow", labelKey: "pfie.navigation.results", route: "/pfie/results", lifecycle: "available", source: "pactus-pro:pfie-enterprise-shell" },
  { id: "pfie.impact_analysis", product: "pfie", group: "analysis", labelKey: "pfie.navigation.impactAnalysis", route: "/pfie/impact-analysis", lifecycle: "available", source: "pactus-pro:pfie-enterprise-shell" },
  { id: "pfie.employee_audit", product: "pfie", group: "analysis", labelKey: "pfie.navigation.employeeAudit", route: "/pfie/employee-audit", lifecycle: "available", source: "pactus-pro:pfie-enterprise-shell" },
  { id: "pfie.union_classification", product: "pfie", group: "analysis", labelKey: "pfie.navigation.unionClassification", route: "/pfie/classification", lifecycle: "available", source: "pactus-pro:pfie-enterprise-shell" },
  { id: "pfie.executive_intelligence", product: "pfie", group: "executive", labelKey: "pfie.navigation.executiveIntelligence", route: "/pfie/executive-intelligence", lifecycle: "available", source: "pactus-pro:pfie-enterprise-shell" },
  { id: "pfie.executive_reporting", product: "pfie", group: "executive", labelKey: "pfie.navigation.executiveReporting", route: "/pfie/executive-reporting", lifecycle: "available", source: "pactus-pro:pfie-enterprise-shell" },
  { id: "pfie.demo_center", product: "pfie", group: "training", labelKey: "pfie.navigation.demoCenter", route: "/pfie/demo", lifecycle: "available", source: "pactus-pro:pfie-enterprise-shell" },
  { id: "pfie.command_center", product: "pfie", group: "advanced", labelKey: "pfie.navigation.commandCenter", route: "/pfie/command-center", lifecycle: "available", source: "pactus-pro:pfie-enterprise-shell" },
  { id: "pfie.portfolio", product: "pfie", group: "portfolio", labelKey: "pfie.navigation.multiUnionPortfolio", route: "/pfie/portfolio", lifecycle: "available", source: "pactus-pro:pfie-enterprise-shell" },
  { id: "pfie.portfolio_command_center", product: "pfie", group: "portfolio", labelKey: "pfie.navigation.portfolioCommandCenter", route: "/pfie/portfolio-command-center", lifecycle: "available", source: "pactus-pro:pfie-enterprise-shell" },
  { id: "pfie.cross_union_simulation", product: "pfie", group: "portfolio", labelKey: "pfie.navigation.crossUnionSimulation", route: "/pfie/cross-union-simulation", lifecycle: "available", source: "pactus-pro:pfie-enterprise-shell" },
  { id: "pfie.knowledge_graph", product: "pfie", group: "portfolio", labelKey: "pfie.navigation.knowledgeGraph", route: "/pfie/knowledge-graph", lifecycle: "available", source: "pactus-pro:pfie-enterprise-shell" },
  { id: "pfie.billable_time", product: "pfie", group: "administration", labelKey: "pfie.navigation.billableTime", route: "/pfie/billable-time", lifecycle: "available", source: "pactus-pro:pfie-enterprise-shell" },
  { id: "pfie.billable_rates", product: "pfie", group: "administration", labelKey: "pfie.navigation.billableRates", route: "/pfie/billable-rates", lifecycle: "available", source: "pactus-pro:pfie-enterprise-shell" },
  { id: "pfie.audit", product: "pfie", group: "administration", labelKey: "pfie.navigation.audit", route: "/pfie/audit", lifecycle: "available", source: "pactus-pro:pfie-enterprise-shell" },
  { id: "pfie.report_center", product: "pfie", group: "administration", labelKey: "pfie.navigation.reportCenter", route: "/reports", lifecycle: "available", source: "pactus-pro:pfie-enterprise-shell" },
  { id: "pfie.user_guide", product: "pfie", group: "help", labelKey: "pfie.navigation.userGuide", route: "/pfie/user-guide", lifecycle: "available", source: "pactus-pro:pfie-enterprise-shell" }
];

export const PRODUCT_FUNCTIONS = [
  ...LRO_FUNCTIONS,
  ...PFIE_FUNCTIONS,
] as const;
