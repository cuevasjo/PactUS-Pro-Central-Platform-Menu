export type SupportTierCode = "essential" | "priority" | "premier";
export type SupportSeverity = "low" | "normal" | "high" | "critical";
export type SupportTicketStatus =
  | "open"
  | "assigned"
  | "waiting_on_customer"
  | "in_progress"
  | "resolved"
  | "closed";

export interface SupportPlan {
  code: SupportTierCode;
  nameKey: string;
  defaultResponseTargetHours: number;
  coverage: "business_hours" | "24x7";
  active: boolean;
}

export interface SupportTicket {
  id: string;
  organizationId: string;
  requesterUserId: string;
  productCode?: string;
  moduleCode?: string;
  subject: string;
  description: string;
  severity: SupportSeverity;
  status: SupportTicketStatus;
  preferredLocale: string;
  createdAt: string;
  firstResponseAt?: string;
  resolvedAt?: string;
  assignedTeamId?: string;
  assignedAgentId?: string;
}

export interface SlaPolicy {
  supportTier: SupportTierCode;
  severity: SupportSeverity;
  responseTargetHours: number;
  coverage: "business_hours" | "24x7";
}

export interface SlaEvaluation {
  responseDeadline: string;
  breached: boolean;
  remainingMinutes: number;
}
