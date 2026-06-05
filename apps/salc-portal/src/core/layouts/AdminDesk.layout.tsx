import { Sidebar, SidebarProvider } from "@/core/components/admin-desk/sidebar/all-components-sidebar";
import { useAppLayout } from "@/core/hooks/useAppLayout.use";
import HeaderSidebar from "@/core/components/admin-desk/sidebar/header-sidebar";
import MenuSidebar from "@/core/components/admin-desk/sidebar/menu-sidebar";
import FooterSidebar from "@/core/components/admin-desk/sidebar/footer-sidebar";
import Inset from "@/core/components/admin-desk/sidebar/inset";

export default function AdminDeskLayout() {
    const { userResponse, logout, filteredNavItems, pathname } = useAppLayout();

    if (!userResponse) return null;

    if (userResponse)
        return (
            <SidebarProvider>
                <Sidebar>
                    <HeaderSidebar />
                    <MenuSidebar filteredNavItems={filteredNavItems} pathname={pathname} />
                    <FooterSidebar userResponse={userResponse} logout={logout} />
                </Sidebar>
                <Inset filteredNavItems={filteredNavItems} pathname={pathname} />
            </SidebarProvider>
        );
}
