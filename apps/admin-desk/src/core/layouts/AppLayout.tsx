import { Link, Outlet, useLocation } from "react-router-dom";
import { Database, GraduationCap, Layers, LayoutDashboard, LogOut, UserPlus, Users } from "lucide-react";

import { Button } from "@/core/components/buttons/button";
import { Separator } from "@/core/components/ui/separator";
import {
    Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
    SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton,
    SidebarMenuItem, SidebarProvider, SidebarTrigger
} from "@/core/components/sidebar/sidebar";

const navItems = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
        adminOnly: false,
    },
    {
        title: 'Migración de Datos',
        href: '/dashboard/data-migration',
        icon: Database,
        adminOnly: true,
    },
    {
        title: 'Matrícula de Estudiantes',
        href: '/dashboard/student-onboarding',
        icon: UserPlus,
        adminOnly: false,
    },
    {
        title: 'Niveles de Estudiantes',
        href: '/dashboard/student-levels',
        icon: Layers,
        adminOnly: false,
    },
    {
        title: 'Registro de Usuarios',
        href: '/dashboard/user-registration',
        icon: Users,
        adminOnly: true,
    },
]



export default function AppLayout() {

    const isAdmin = true;
    const pathname = useLocation().pathname;

    const filteredNavItems = navItems.filter(item => !item.adminOnly || isAdmin)

    const logout = () => {
        console.log('logout');
    }

    const user = {
        userFullName: 'Jonna Rodriguez',
        userRole: 'ADMIN',
    }

    return (
        <>
            <SidebarProvider>
                <Sidebar>
                    <SidebarHeader className="border-b border-sidebar-border">
                        <div className="flex items-center gap-3 px-4 py-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary">
                                <GraduationCap className="h-5 w-5 text-sidebar-primary-foreground" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold text-sidebar-foreground">SmartFlow</span>
                                <span className="text-xs text-sidebar-foreground/70">Gestión Estudiantil</span>
                            </div>
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel>Navegación</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {filteredNavItems.map((item) => {
                                        const isActive = pathname === item.href
                                        return (
                                            <SidebarMenuItem key={item.href}>
                                                <SidebarMenuButton asChild isActive={isActive}>
                                                    <Link to={item.href}>
                                                        <item.icon className="h-4 w-4" />
                                                        <span>{item.title}</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        )
                                    })}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                    <SidebarFooter className="border-t border-sidebar-border">
                        <div className="p-4">
                            <div className="mb-3 flex flex-col">
                                <span className="text-sm font-medium text-sidebar-foreground">
                                    {user.userFullName}
                                </span>
                                <span className="text-xs text-sidebar-foreground/70">
                                    {user.userRole === 'ADMIN' ? 'Administrador' : 'Profesor'}
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
