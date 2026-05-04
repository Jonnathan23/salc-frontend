import { usePermissions } from '@/features/indentity/application/hooks/forms/usePermissions.use';
import { useAuthStore } from '@/features/indentity/application/store/auth.store';
import type { SystemPermission } from '@salc/core/enums/Permissions';
import { Navigate, Outlet } from 'react-router-dom';



interface ProtectedRouteProps {
    requiredPermissions?: SystemPermission[];
}

export const ProtectedRoute = ({ requiredPermissions }: ProtectedRouteProps) => {
    const { isAuthenticated, userResponse } = useAuthStore();
    const { hasPermission } = usePermissions();

    if (!isAuthenticated || !userResponse) {
        return <Navigate to="/auth/login" replace />;
    }

    if (requiredPermissions && requiredPermissions.length > 0 && !hasPermission(requiredPermissions)) {

        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};