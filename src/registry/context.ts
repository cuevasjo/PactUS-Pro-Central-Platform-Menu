export interface ExperienceContext {
  helpContext: string;
  trainingContext: string;
  supportContext: string;
}

export function buildExperienceContext(scope: string): ExperienceContext {
  return {
    helpContext: scope,
    trainingContext: scope,
    supportContext: scope,
  };
}
