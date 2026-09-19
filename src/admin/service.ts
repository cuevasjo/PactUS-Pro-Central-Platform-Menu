import type { CentralAuthorizationSnapshot } from "../access/types";
import { ADMIN_NAVIGATION } from "./navigation";

export function visibleAdminNavigation(snapshot: CentralAuthorizationSnapshot) {
  return ADMIN_NAVIGATION.filter((item) =>
    !item.requiredPermission || snapshot.permissions.has(item.requiredPermission),
  );
}
