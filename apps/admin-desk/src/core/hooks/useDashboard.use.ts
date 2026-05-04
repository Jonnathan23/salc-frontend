import { useMemo } from "react";

import { useAuthStore } from "@/features/indentity/application/store/auth.store";
import { usePermissions } from "@/features/indentity/application/hooks/forms/usePermissions.use";
import { userRoles } from "@salc/core/interfaces";
import { navItems } from "@/core/data/navItems";

export const useDashboard = () => {
    const { userResponse } = useAuthStore();
    const { hasPermission } = usePermissions();

    const isAdmin = useMemo(() => userResponse?.us_role === userRoles.ADMIN, [userResponse]);

    const filteredActions = useMemo(
        () => navItems.filter((action) => hasPermission(action.permissions)),
        [hasPermission]
    );

    return {
        isAdmin,
        filteredActions
    }
}