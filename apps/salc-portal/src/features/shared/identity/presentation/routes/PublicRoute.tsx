import { useAuthStore } from "@/features/shared/identity/application/store/auth.store";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
    const { isAuthenticated } = useAuthStore();

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};
