export type CreditType = "service_credit" | "training_hours" | "support_extension" | "consultation";
export type CreditStatus = "pending_review" | "approved" | "available" | "partially_used" | "used" | "expired" | "denied";
export interface CustomerCredit {
  id: string; organizationId: string; type: CreditType; source: "sla_breach" | "implementation" | "customer_success" | "promotion" | "contract";
  status: CreditStatus; amount?: number; hours?: number; currency?: string; expiresAt?: string; notes?: string;
}
export type ImprovementType = "challenge" | "improvement" | "feature_request";
export type ImprovementStatus = "submitted" | "under_review" | "need_more_information" | "planned" | "in_development" | "testing" | "released" | "not_planned" | "duplicate";
export interface ImprovementRequest {
  id: string; organizationId: string; requesterUserId: string; type: ImprovementType; status: ImprovementStatus;
  productCode?: string; moduleCode?: string; page?: string; title: string; description: string;
  businessImpact?: string; attachmentIds?: string[]; duplicateOfId?: string; preferredLocale: string; createdAt: string;
}
export type SurveyType = "technical_support" | "sales_implementation";
export interface SurveyResponse {
  id: string; organizationId: string; userId: string; type: SurveyType; preferredLocale: string; createdAt: string;
  productCode?: string; moduleCode?: string; supportTicketId?: string; implementationStage?: string;
  csat?: number; timeliness?: number; quality?: number; knowledge?: number; communication?: number; resolution?: number; ease?: number; nps?: number; comment?: string;
}
