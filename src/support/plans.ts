import type { SlaPolicy, SupportPlan, SupportSeverity } from "./types";

export const SUPPORT_PLANS: SupportPlan[] = [
  {
    code: "essential",
    nameKey: "support.plan.essential",
    defaultResponseTargetHours: 72,
    coverage: "business_hours",
    active: true,
  },
  {
    code: "priority",
    nameKey: "support.plan.priority",
    defaultResponseTargetHours: 24,
    coverage: "business_hours",
    active: true,
  },
  {
    code: "premier",
    nameKey: "support.plan.premier",
    defaultResponseTargetHours: 3,
    coverage: "24x7",
    active: true,
  },
];

const severityMultiplier: Record<SupportSeverity, number> = {
  low: 1.5,
  normal: 1,
  high: 0.5,
  critical: 0.25,
};

export function buildSlaPolicy(
  plan: SupportPlan,
  severity: SupportSeverity,
): SlaPolicy {
  const responseTargetHours = Math.max(
    1,
    Math.round(plan.defaultResponseTargetHours * severityMultiplier[severity] * 100) / 100,
  );

  return {
    supportTier: plan.code,
    severity,
    responseTargetHours,
    coverage: plan.coverage,
  };
}
