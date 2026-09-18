export const ENTITLEMENTS = {
  product: {
    lro: "product.lro",
    pfie: "product.pfie",
    scout: "product.scout",
  },
  lro: {
    contracts: "lro.contracts",
    bargainingUnits: "lro.bargaining_units",
    jobDescriptions: "lro.job_descriptions",
    grievances: "lro.grievances",
    arbitration: "lro.arbitration",
    negotiation: "lro.negotiation",
    aiNegotiationCopilot: "lro.ai_negotiation_copilot",
    compliance: "lro.compliance",
    reports: "lro.reports",
    externalSystems: "lro.external_systems",
  },
  pfie: {
    financialModeling: "pfie.financial_modeling",
    scenarios: "pfie.scenarios",
    employeeCostAnalytics: "pfie.employee_cost_analytics",
    benefits: "pfie.benefits",
    workforce: "pfie.workforce",
    crossUnionImpact: "pfie.cross_union_impact",
    forecasting: "pfie.forecasting",
    executiveDashboard: "pfie.executive_dashboard",
    reporting: "pfie.reporting",
  },
  scout: {
    opportunitySearch: "scout.opportunity_search",
    crawling: "scout.crawling",
    entityMonitoring: "scout.entity_monitoring",
    alerts: "scout.alerts",
    competitiveIntelligence: "scout.competitive_intelligence",
    export: "scout.export",
  },
  platform: {
    time: "platform.time",
    experience: "platform.experience",
    support: "platform.support",
    admin: "platform.admin",
  },
  service: {
    supportEssential: "service.support.essential",
    supportPriority: "service.support.priority",
    supportPremier: "service.support.premier",
    trainingStandard: "service.training.standard",
    trainingAdvanced: "service.training.advanced",
  },
} as const;

export type EntitlementCode =
  | (typeof ENTITLEMENTS.product)[keyof typeof ENTITLEMENTS.product]
  | (typeof ENTITLEMENTS.lro)[keyof typeof ENTITLEMENTS.lro]
  | (typeof ENTITLEMENTS.pfie)[keyof typeof ENTITLEMENTS.pfie]
  | (typeof ENTITLEMENTS.scout)[keyof typeof ENTITLEMENTS.scout]
  | (typeof ENTITLEMENTS.platform)[keyof typeof ENTITLEMENTS.platform]
  | (typeof ENTITLEMENTS.service)[keyof typeof ENTITLEMENTS.service];
