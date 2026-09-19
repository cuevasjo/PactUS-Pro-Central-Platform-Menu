import type { AdminUserAccessRow } from "./types";

export interface AccessMatrixCell {
  key: string;
  enabled: boolean;
}

export function buildAccessMatrixRow(user: AdminUserAccessRow, knownCapabilities: readonly string[]) {
  const effective = new Set([
    ...user.productEntitlements,
    ...user.featureEntitlements,
    ...user.permissions,
  ]);

  return {
    userId: user.userId,
    displayName: user.displayName,
    email: user.email,
    role: user.role,
    supportPlan: user.supportPlan,
    active: user.active,
    cells: knownCapabilities.map((key): AccessMatrixCell => ({
      key,
      enabled: effective.has(key),
    })),
  };
}
