import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/features/indentity/application/store/auth.store";
import { usePermissions } from "@/features/indentity/application/hooks/usePermissions.use";
import { navItems } from "@/core/data/navItems";



export const useAppLayout = () => {
    const pathname = useLocation().pathname;
    const navigate = useNavigate();

    const { userResponse, setLogoutSession } = useAuthStore();
    const { hasPermission } = usePermissions();

    const filteredNavItems = navItems.filter((item) => hasPermission(item.permissions));

    const logout = () => {
        setLogoutSession();
        navigate('/auth/login', { replace: true });
    };


    return {
        pathname,
        navigate,
        userResponse,
        setLogoutSession,
        hasPermission,
        filteredNavItems,
        logout
    }
}