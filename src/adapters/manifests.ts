import type { ProductAdapterManifest } from "./types";

export const PRODUCT_ADAPTERS: ProductAdapterManifest[] = [
  {
    id: "phase28.workforce-governance",
    phase: 28,
    name: "Workforce Governance, Job Descriptions, Credentials & Position Control",
    product: "lro",
    external: {
      repository: "pactuspro/pactus-pro",
      branch: "phase-28-workforce-governance",
      relationship: "read_only_contract",
    },
    routeNamespace: "/contracts",
    capabilities: [
      "identity_context","effective_access","navigation","localization",
      "experience_context","time_billing","admin_context"
    ],
    functionIds: [
      "lro.bargaining_units",
      "lro.job_descriptions",
    ],
    localizationNamespace: "lro",
    helpContext: "lro.workforce_governance",
    trainingContext: "lro.workforce_governance",
    supportContext: "lro.workforce_governance",
    timerContextEnabled: true,
    status: "development",
  },
  {
    id: "phase29.ucsii",
    phase: 29,
    name: "Universal Capital & Strategic Investment Impact Engine",
    product: "pfie",
    external: {
      repository: "pactuspro/Phase-29-UCSII-Universal-Capital-Strategic-Investment-Impact-Engine",
      branch: "phase-29-ucsii-development",
      relationship: "read_only_contract",
    },
    routeNamespace: "/pfie",
    capabilities: [
      "identity_context","effective_access","navigation","localization",
      "experience_context","time_billing"
    ],
    functionIds: [
      "pfie.executive_intelligence",
      "pfie.portfolio",
      "pfie.portfolio_command_center",
    ],
    localizationNamespace: "pfie.ucsii",
    helpContext: "pfie.ucsii",
    trainingContext: "pfie.ucsii",
    supportContext: "pfie.ucsii",
    timerContextEnabled: true,
    status: "development",
  },
  {
    id: "phase30.benefits-intelligence",
    phase: 30,
    name: "PFIE Benefits Intelligence & Audit",
    product: "pfie",
    external: {
      repository: "pactuspro/Phase-30-Health-Insurance-Comparison-Module",
      branch: "phase-30-central-platform-ready-certified-2026-09-18",
      relationship: "read_only_contract",
    },
    routeNamespace: "/pfie/benefits",
    capabilities: [
      "identity_context","effective_access","navigation","localization",
      "experience_context","time_billing"
    ],
    functionIds: [
      "pfie.employee_audit",
      "pfie.executive_reporting",
    ],
    localizationNamespace: "pfie.benefits",
    helpContext: "pfie.benefits",
    trainingContext: "pfie.benefits",
    supportContext: "pfie.benefits",
    timerContextEnabled: true,
    status: "ready_for_adapter",
  },
  {
    id: "phase31.lro-tiptap",
    phase: 31,
    name: "LRO V2 / TipTap Improvements",
    product: "lro",
    external: {
      repository: "pactuspro/Phase-31-lro-v2-Tip-Tap-Improvements",
      branch: "main",
      relationship: "read_only_contract",
    },
    routeNamespace: "/",
    capabilities: [
      "identity_context","effective_access","navigation","localization",
      "experience_context","time_billing"
    ],
    functionIds: [
      "lro.tiptap.home",
      "lro.tiptap.new_contract",
      "lro.tiptap.e_learning",
      "lro.tiptap.inbox",
      "lro.tiptap.analytics",
      "lro.tiptap.admin",
    ],
    localizationNamespace: "lro.tiptap",
    helpContext: "lro.tiptap",
    trainingContext: "lro.tiptap",
    supportContext: "lro.tiptap",
    timerContextEnabled: true,
    status: "transitional",
  },
];
