import type { SurveyResponse } from "./types";

export function validateSurveyScore(score?: number, max = 5): boolean {
  return score === undefined || (Number.isInteger(score) && score >= 1 && score <= max);
}

export function surveyNeedsFollowUp(response: SurveyResponse): boolean {
  return (response.csat !== undefined && response.csat <= 2) ||
    (response.nps !== undefined && response.nps <= 6);
}
