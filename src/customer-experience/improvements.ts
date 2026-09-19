import type { ImprovementRequest, ImprovementStatus } from "./types";

const transitions: Record<ImprovementStatus, ImprovementStatus[]> = {
  submitted: ["under_review", "duplicate"],
  under_review: ["need_more_information", "planned", "not_planned", "duplicate"],
  need_more_information: ["under_review", "not_planned"],
  planned: ["in_development", "not_planned"],
  in_development: ["testing"],
  testing: ["in_development", "released"],
  released: [],
  not_planned: ["under_review"],
  duplicate: [],
};

export function canTransitionImprovement(from: ImprovementStatus, to: ImprovementStatus): boolean {
  return transitions[from].includes(to);
}

export function organizationVisibleRequests(
  requests: readonly ImprovementRequest[],
  organizationId: string,
): ImprovementRequest[] {
  return requests.filter((request) => request.organizationId === organizationId);
}
