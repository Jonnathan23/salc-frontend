import { Sidebar, SidebarProvider } from "@/core/components/admin-desk/sidebar/all-components-sidebar";
import HeaderSidebar from "@/core/components/admin-desk/sidebar/header-sidebar";
import MenuSidebar from "@/core/components/admin-desk/sidebar/menu-sidebar";
import FooterSidebar from "@/core/components/admin-desk/sidebar/footer-sidebar";
import Inset from "@/core/components/admin-desk/sidebar/inset";
import { useClassTrackLayout } from "@/core/hooks/useClassTrackLayout.use";

export default function ClassTrackLayout() {
    const { pathname, userResponse, filteredNavItems, logout } = useClassTrackLayout();

    if (!userResponse) return null;

    return (
        <SidebarProvider>
            <Sidebar>
                <HeaderSidebar nameSystem={"CLASS TRACK"} />
                <MenuSidebar filteredNavItems={filteredNavItems} pathname={pathname} />
                <FooterSidebar userResponse={userResponse} logout={logout} />
            </Sidebar>
            <Inset filteredNavItems={filteredNavItems} pathname={pathname} />
        </SidebarProvider>
    );
}
