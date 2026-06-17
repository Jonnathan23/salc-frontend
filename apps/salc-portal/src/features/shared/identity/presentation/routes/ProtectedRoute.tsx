import { usePermissions } from "@/features/shared/identity/application/hooks/forms/usePermissions.use";
import { useAuthStore } from "@/features/shared/identity/application/store/auth.store";
import type { SystemPermission } from "@salc/core/enums/Permissions";
import { Navigate, Outlet } from "react-router-dom";
import { useVerifyUser } from "@/features/shared/identity/application/hooks/use-cases/useVerifyUser.hook";

interface ProtectedRouteProps {
    requiredPermissions?: SystemPermission[];
}

export const ProtectedRoute = ({ requiredPermissions }: ProtectedRouteProps) => {
    const { isAuthenticated, userResponse } = useAuthStore();
    const { hasPermission } = usePermissions();
    const { isError } = useVerifyUser(isAuthenticated);

    if (!isAuthenticated || !userResponse || isError) {
        return <Navigate to="/auth/Login" replace />;
    }

    if (requiredPermissions && requiredPermissions.length > 0 && !hasPermission(requiredPermissions)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};
