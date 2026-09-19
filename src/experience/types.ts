export type ExperienceArea =
  | "help"
  | "training"
  | "support"
  | "improvements"
  | "surveys"
  | "whats_new";

export interface ExperienceNavigationItem {
  id: string;
  area: ExperienceArea;
  labelKey: string;
  route: string;
  requiredEntitlements?: string[];
  requiredPermissions?: string[];
}

export interface TrainingResource {
  id: string;
  titleKey: string;
  descriptionKey: string;
  contentType:
    | "video"
    | "article"
    | "book"
    | "blog"
    | "resource"
    | "template"
    | "practice"
    | "quiz"
    | "walkthrough"
    | "certification";
  productCodes: string[];
  moduleCodes?: string[];
  requiredEntitlements?: string[];
  requiredPermissions?: string[];
  industries?: string[];
  roles?: string[];
  tags: string[];
  estimatedMinutes?: number;
  authorName?: string;
  rating?: number;
  viewCount?: number;
  downloadable?: boolean;
  required?: boolean;
  certificationEligible?: boolean;
  lifecycle: "available" | "beta" | "archived";
}

export interface TrainingAssignment {
  id: string;
  resourceId: string;
  organizationId: string;
  userId?: string;
  roleName?: string;
  required: boolean;
  dueAt?: string;
  status: "assigned" | "in_progress" | "completed" | "waived";
}

export interface HelpArticle {
  id: string;
  titleKey: string;
  summaryKey: string;
  productCode?: string;
  moduleCode?: string;
  tags: string[];
  lifecycle: "available" | "beta" | "archived";
}
