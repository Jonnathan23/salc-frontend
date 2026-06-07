import { useMemo } from "react";

import { useAuthStore } from "@/features/shared/identity/application/store/auth.store";
import { usePermissions } from "@/features/shared/identity/application/hooks/forms/usePermissions.use";
import { userRoles } from "@salc/core/interfaces";
import { navItems } from "@/core/data/navItems";

export const useDashboard = () => {
    const { userResponse } = useAuthStore();
    const { hasPermission } = usePermissions();

    const canWrite = useMemo(() => {
        if (!userResponse) return false;

        return userResponse.role === userRoles.ADMIN;
    }, [userResponse]);

    const filteredActions = useMemo(() => navItems.filter((action) => hasPermission(action.permissions)), [hasPermission]);

    return {
        canWrite,
        filteredActions,
    };
};
