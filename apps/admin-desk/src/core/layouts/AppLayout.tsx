import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

import { Button } from "@/core/components/buttons/button";
import { Separator } from "@/core/components/ui/separator";
import {
    Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
    SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton,
    SidebarMenuItem, SidebarProvider, SidebarTrigger
} from "@/core/components/sidebar/sidebar";
import { navItems } from "@/core/data";
import { useAuthStore } from "@/features/indentity/application/store/auth.store";
import { usePermissions } from "@/features/indentity/application/hooks/usePermissions.use";




export default function AppLayout() {

    const pathname = useLocation().pathname;
    const navigate = useNavigate();

    const { userResponse, setLogoutSession } = useAuthStore();
    const { hasPermission } = usePermissions();

    const filteredNavItems = navItems.filter((item) => hasPermission(item.permissions));

    const logout = () => {
        setLogoutSession();
        navigate('/auth/login', { replace: true });
    };

    if (!userResponse) return null;

    if (userResponse) return (
        <>
            <SidebarProvider>
                <Sidebar>
                    <SidebarHeader className="border-b border-sidebar-border">
                        <div className="flex items-center gap-3 px-4 py-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary">
                                <img src="/logo-salc.png" alt="Logo SALC" className="h-5 w-5 text-sidebar-primary-foreground" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold text-sidebar-foreground">SALC</span>
                                <span className="text-xs text-sidebar-foreground/70">Admin Desk</span>
                            </div>
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel>Navegación</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {filteredNavItems.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <SidebarMenuItem key={item.href}>
                                                <SidebarMenuButton asChild isActive={isActive}>
                                                    <Link to={item.href}>
                                                        <item.icon className="h-4 w-4" />
                                                        <span>{item.title}</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        );
                                    })}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                    <SidebarFooter className="border-t border-sidebar-border">
                        <div className="p-4">
                            <div className="mb-3 flex flex-col">
                                <span className="text-sm font-medium text-sidebar-foreground">
                                    {userResponse.us_full_name}
                                </span>
                                <span className="text-xs text-sidebar-foreground/70">
                                    {userResponse.us_role}
                                </span>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full border-sidebar-border bg-transparent text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                onClick={logout}
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                Cerrar Sesión
                            </Button>
                        </div>
                    </SidebarFooter>
                </Sidebar>
                <SidebarInset>
                    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4">
                        <SidebarTrigger className="-ml-2" />
                        <Separator orientation="vertical" className="h-6" />
                        <h1 className="text-lg font-semibold text-foreground">
                            {filteredNavItems.find(item => item.href === pathname)?.title || 'Dashboard'}
                        </h1>
                    </header>
                    <main className="flex-1 p-6">
                        <Outlet />
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
