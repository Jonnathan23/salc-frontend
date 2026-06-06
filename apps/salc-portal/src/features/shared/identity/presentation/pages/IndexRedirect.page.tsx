import { Navigate } from "react-router-dom";

import { systemPermissions } from "@salc/core/enums/Permissions";

import { useAuthStore } from "@/features/shared/identity/application/store/auth.store";

export default function IndexRedirect() {
    const { userResponse } = useAuthStore();

    if (!userResponse) {
        return <Navigate to="/auth/Login" replace />;
    }

    if (userResponse.permissions.includes(systemPermissions.ADMINDESK_MAIN_ACCESS)) {
        return <Navigate to="/admin-desk/dashboard" replace />;
    }

    return <Navigate to="/class-track/dashboard" replace />;
}
