import type { CustomerCredit } from "./types";

export function availableTrainingHours(credits: readonly CustomerCredit[], now = new Date()): number {
  return credits.filter((credit) =>
    credit.type === "training_hours" &&
    ["approved", "available", "partially_used"].includes(credit.status) &&
    (!credit.expiresAt || new Date(credit.expiresAt).getTime() > now.getTime())
  ).reduce((sum, credit) => sum + (credit.hours ?? 0), 0);
}

export function qualifiesForAutomaticFinancialIssuance(_credit: CustomerCredit): false {
  // Financial/service credits require governed contractual review.
  return false;
}
