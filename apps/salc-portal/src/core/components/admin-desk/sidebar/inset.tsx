import { Outlet } from "react-router-dom";

import { Separator } from "@/core/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/core/components/admin-desk/sidebar/all-components-sidebar";
import type { NavItem } from "@/core/interfaces/NavItem";

interface InsetProps {
    filteredNavItems: NavItem[];
    pathname: string;
}

export default function Inset({ filteredNavItems, pathname }: InsetProps) {
    return (
        <SidebarInset>
            <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4">
                <SidebarTrigger className="-ml-2" />
                <Separator orientation="vertical" className="h-6" />
                <h1 className="text-lg font-semibold text-foreground">
                    {filteredNavItems.find((item) => item.href === pathname)?.title || "Dashboard"}
                </h1>
            </header>
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </SidebarInset>
    );
}
