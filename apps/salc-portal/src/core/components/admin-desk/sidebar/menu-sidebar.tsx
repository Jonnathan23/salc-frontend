import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/core/components/admin-desk/sidebar/all-components-sidebar";
import { Link } from "react-router-dom";
import type { NavItem } from "@/core/interfaces/NavItem";

interface MenuSidebarProps {
    filteredNavItems: NavItem[];
    pathname: string;
}

export default function MenuSidebar({ filteredNavItems, pathname }: MenuSidebarProps) {
    return (
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
    );
}
