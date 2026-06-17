import { Navigate } from "react-router-dom";

import { systemPermissions } from "@salc/core/enums/Permissions";

import { useAuthStore } from "@/features/shared/identity/application/store/auth.store";
import { usePermissions } from "@/features/shared/identity/application/hooks/forms/usePermissions.use";

export default function IndexRedirect() {
    const { userResponse } = useAuthStore();
    const { hasPermission } = usePermissions();

    if (!userResponse) {
        return <Navigate to="/auth/Login" replace />;
    }

    if (hasPermission([systemPermissions.ADMINDESK_MAIN_ACCESS])) {
        return <Navigate to="/admin-desk/dashboard" replace />;
    }

    if (hasPermission([systemPermissions.CLASSTRACK_MAIN_ACCESS])) {
        return <Navigate to="/class-track/dashboard" replace />;
    }

    return <Navigate to="/no-permissions" replace />;
}
