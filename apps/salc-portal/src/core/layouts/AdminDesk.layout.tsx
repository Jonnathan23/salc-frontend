import { Sidebar, SidebarProvider } from "@/core/components/admin-desk/sidebar/AllComponentsSidebar";
import { useAppLayout } from "@/core/hooks/useAppLayout.use";
import HeaderSidebar from "@/core/components/admin-desk/sidebar/HeaderSidebar";
import MenuSidebar from "@/core/components/admin-desk/sidebar/MenuSidebar";
import FooterSidebar from "@/core/components/admin-desk/sidebar/FooterSidebar";
import Inset from "@/core/components/admin-desk/sidebar/Inset";

export default function AdminDeskLayout() {
    const { userResponse, logout, filteredNavItems, pathname } = useAppLayout();

    if (!userResponse) return null;

    if (userResponse)
        return (
            <SidebarProvider>
                <Sidebar>
                    <HeaderSidebar nameSystem={"ADMIN DESK"} />
                    <MenuSidebar filteredNavItems={filteredNavItems} pathname={pathname} />
                    <FooterSidebar userResponse={userResponse} logout={logout} />
                </Sidebar>
                <Inset filteredNavItems={filteredNavItems} pathname={pathname} />
            </SidebarProvider>
        );
}
