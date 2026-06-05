import { classTrackNavItems } from "@/core/data/navItemsClassTrack";
import { usePermissions } from "@/features/shared/identity/application/hooks";
import { useAuthStore } from "@/features/shared/identity/application/store/auth.store";
import { useLocation, useNavigate } from "react-router-dom";

export const useClassTrackLayout = () => {
    const pathname = useLocation().pathname;
    const navigate = useNavigate();

    const { userResponse, setLogoutSession } = useAuthStore();
    const { hasPermission } = usePermissions();

    const filteredNavItems = classTrackNavItems.filter((item) => hasPermission(item.permissions));

    const logout = () => {
        setLogoutSession();
        navigate("/auth/login", { replace: true });
    };

    return {
        pathname,
        navigate,
        userResponse,
        setLogoutSession,
        hasPermission,
        filteredNavItems,
        logout,
    };
};
