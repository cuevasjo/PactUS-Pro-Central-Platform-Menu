import type { ActiveTimer, TimeContext, TimeEntry } from "./types";

export function startTimer(id: string, context: TimeContext, now = new Date()): ActiveTimer {
  return { id, context, startedAt: now.toISOString(), accumulatedSeconds: 0, runningSince: now.toISOString(), status: "running" };
}

export function pauseTimer(timer: ActiveTimer, now = new Date()): ActiveTimer {
  if (timer.status === "paused") return timer;
  const runningSince = timer.runningSince ? new Date(timer.runningSince).getTime() : now.getTime();
  const extra = Math.max(0, Math.floor((now.getTime() - runningSince) / 1000));
  return { ...timer, accumulatedSeconds: timer.accumulatedSeconds + extra, runningSince: undefined, status: "paused" };
}

export function resumeTimer(timer: ActiveTimer, now = new Date()): ActiveTimer {
  if (timer.status === "running") return timer;
  return { ...timer, runningSince: now.toISOString(), status: "running" };
}

export function stopTimer(timer: ActiveTimer, now = new Date()): TimeEntry {
  const paused = pauseTimer(timer, now);
  return {
    id: timer.id,
    context: timer.context,
    startedAt: timer.startedAt,
    endedAt: now.toISOString(),
    durationSeconds: paused.accumulatedSeconds,
    billable: true,
    status: "stopped",
  };
}

export function currentElapsedSeconds(timer: ActiveTimer, now = new Date()): number {
  if (timer.status === "paused" || !timer.runningSince) return timer.accumulatedSeconds;
  return timer.accumulatedSeconds + Math.max(0, Math.floor((now.getTime() - new Date(timer.runningSince).getTime()) / 1000));
}
