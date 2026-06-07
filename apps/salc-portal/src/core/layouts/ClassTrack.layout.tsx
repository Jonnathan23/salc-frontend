import { Sidebar, SidebarProvider } from "@/core/components/ui/admin-desk/sidebar/AllComponentsSidebar";
import HeaderSidebar from "@/core/components/ui/admin-desk/sidebar/HeaderSidebar";
import MenuSidebar from "@/core/components/ui/admin-desk/sidebar/MenuSidebar";
import FooterSidebar from "@/core/components/ui/admin-desk/sidebar/FooterSidebar";
import Inset from "@/core/components/ui/admin-desk/sidebar/Inset";
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
