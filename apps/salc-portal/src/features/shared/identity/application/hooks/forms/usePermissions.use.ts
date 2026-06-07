import { useAuthStore } from "@/features/shared/identity/application/store/auth.store";
import type { SystemPermission } from "@salc/core/enums/Permissions";
import { userRoles } from "@salc/core/interfaces";

export const usePermissions = () => {
    const { userResponse } = useAuthStore();

    const hasPermission = (requiredPermissions?: SystemPermission[]): boolean => {
        if (!requiredPermissions || requiredPermissions.length === 0) return true;

        if (!userResponse) return false;

        if (userResponse.role === userRoles.ADMIN) return true;

        if (!userResponse.permissions || userResponse.permissions.length === 0) return false;

        return requiredPermissions.some((permission) => userResponse.permissions?.includes(permission));
    };

    return { hasPermission };
};
