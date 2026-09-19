import assert from "node:assert/strict";
import { availableTrainingHours, canTransitionImprovement, organizationVisibleRequests, qualifiesForAutomaticFinancialIssuance, surveyNeedsFollowUp, validateSurveyScore } from "../src/customer-experience/index.js";

const credits = [
  { id:"c1", organizationId:"o1", type:"training_hours" as const, source:"sla_breach" as const, status:"available" as const, hours:2, expiresAt:"2027-01-01T00:00:00Z" },
  { id:"c2", organizationId:"o1", type:"training_hours" as const, source:"contract" as const, status:"available" as const, hours:3 },
];
assert.equal(availableTrainingHours(credits, new Date("2026-09-19T00:00:00Z")), 5);
assert.equal(qualifiesForAutomaticFinancialIssuance(credits[0]), false);

assert.equal(canTransitionImprovement("submitted","under_review"), true);
assert.equal(canTransitionImprovement("submitted","released"), false);
const requests = [
 { id:"r1",organizationId:"o1",requesterUserId:"u1",type:"feature_request" as const,status:"submitted" as const,title:"A",description:"A",preferredLocale:"en-US",createdAt:"2026-09-19T00:00:00Z" },
 { id:"r2",organizationId:"o2",requesterUserId:"u2",type:"improvement" as const,status:"submitted" as const,title:"B",description:"B",preferredLocale:"es-US",createdAt:"2026-09-19T00:00:00Z" },
];
assert.equal(organizationVisibleRequests(requests,"o1").length,1);

assert.equal(validateSurveyScore(5),true);
assert.equal(validateSurveyScore(0),false);
assert.equal(surveyNeedsFollowUp({id:"s1",organizationId:"o1",userId:"u1",type:"technical_support",preferredLocale:"en-US",createdAt:"2026-09-19T00:00:00Z",csat:2}),true);
assert.equal(surveyNeedsFollowUp({id:"s2",organizationId:"o1",userId:"u1",type:"sales_implementation",preferredLocale:"en-US",createdAt:"2026-09-19T00:00:00Z",csat:5}),false);
console.log("CP-8/9/10 customer experience tests passed.");
