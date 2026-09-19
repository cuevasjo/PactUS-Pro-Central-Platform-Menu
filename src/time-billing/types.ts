export type TimerStatus = "idle" | "running" | "paused" | "stopped";
export interface TimeContext {
  organizationId: string;
  userId: string;
  clientId?: string;
  matterId?: string;
  productCode?: string;
  moduleCode?: string;
  resourceReference?: string;
}
export interface TimeEntry {
  id: string;
  context: TimeContext;
  activityType?: string;
  startedAt: string;
  endedAt?: string;
  durationSeconds: number;
  billable: boolean;
  billingCode?: string;
  billingRate?: number;
  currency?: string;
  notes?: string;
  status: TimerStatus;
}
export interface ActiveTimer {
  id: string;
  context: TimeContext;
  startedAt: string;
  accumulatedSeconds: number;
  runningSince?: string;
  status: "running" | "paused";
}
