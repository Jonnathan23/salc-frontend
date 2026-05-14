import { useAuthStore } from "@/features/indentity/application/store/auth.store";
import type { SystemPermission } from '@salc/core/enums/Permissions';
import { userRoles } from "@salc/core/interfaces";

export const usePermissions = () => {
    const { userResponse } = useAuthStore();

    const hasPermission = (requiredPermissions?: SystemPermission[]): boolean => {
        // 1. Si la vista es pública, todos pasan
        if (!requiredPermissions || requiredPermissions.length === 0) return true;

        // 2. Si no hay sesión, nadie pasa
        if (!userResponse) return false;

        // 3. INMUNIDAD ADMIN: El Dios del sistema pasa SIEMPRE (se evalúa primero)
        if (userResponse.us_role === userRoles.ADMIN) return true;

        // 4. Si es un rol terrenal (Profesor, Asesor) y no tiene permisos en el estado, se rechaza
        if (!userResponse.permissions || userResponse.permissions.length === 0) return false;

        // 5. Validación estricta para mortales
        return requiredPermissions.some(permission =>
            userResponse.permissions.includes(permission)
        );
    };

    return { hasPermission };
};