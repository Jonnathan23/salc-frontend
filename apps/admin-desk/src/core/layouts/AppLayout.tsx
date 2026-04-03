
import { Sidebar, SidebarProvider } from "@/core/components/sidebar/all-components-sidebar";
import { useAppLayout } from "@/core/hooks/useAppLayout.use";
import HeaderSidebar from "@/core/components/sidebar/header-sidebar";
import MenuSidebar from "@/core/components/sidebar/menu-sidebar";
import FooterSidebar from "@/core/components/sidebar/footer-sidebar";
import Inset from "@/core/components/sidebar/inset";


export default function AppLayout() {

    const { userResponse, logout, filteredNavItems, pathname } = useAppLayout();

    if (!userResponse) return null;

    if (userResponse) return (
        <>
            <SidebarProvider>
                <Sidebar>
                    <HeaderSidebar />
                    <MenuSidebar filteredNavItems={filteredNavItems} pathname={pathname} />
                    <FooterSidebar userResponse={userResponse} logout={logout} />
                </Sidebar>
                <Inset filteredNavItems={filteredNavItems} pathname={pathname} />
            </SidebarProvider>
        </>
    );
}
