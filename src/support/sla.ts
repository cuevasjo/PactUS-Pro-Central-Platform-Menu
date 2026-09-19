import type { SlaEvaluation, SlaPolicy, SupportTicket } from "./types";

export function calculateResponseDeadline(
  createdAt: Date,
  policy: SlaPolicy,
): Date {
  // CP-7 foundation: 24x7 uses elapsed clock hours.
  // Business-hours calendar calculation is intentionally isolated for later
  // production calendar/holiday configuration.
  return new Date(createdAt.getTime() + policy.responseTargetHours * 60 * 60 * 1000);
}

export function evaluateSla(
  ticket: SupportTicket,
  policy: SlaPolicy,
  now = new Date(),
): SlaEvaluation {
  const deadline = calculateResponseDeadline(new Date(ticket.createdAt), policy);
  const effectiveResponse = ticket.firstResponseAt
    ? new Date(ticket.firstResponseAt)
    : now;

  const remainingMinutes = Math.floor(
    (deadline.getTime() - now.getTime()) / 60000,
  );

  return {
    responseDeadline: deadline.toISOString(),
    breached: effectiveResponse.getTime() > deadline.getTime(),
    remainingMinutes,
  };
}

export function escalationThresholds(
  createdAt: Date,
  policy: SlaPolicy,
): Array<{ threshold: 0.5 | 0.75 | 0.9 | 1; at: string }> {
  const totalMs = policy.responseTargetHours * 60 * 60 * 1000;
  return [0.5, 0.75, 0.9, 1].map((threshold) => ({
    threshold: threshold as 0.5 | 0.75 | 0.9 | 1,
    at: new Date(createdAt.getTime() + totalMs * threshold).toISOString(),
  }));
}
