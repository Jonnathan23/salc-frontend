import { Outlet } from "react-router-dom";
import { Suspense } from "react";

import { Separator } from "@/core/components/ui/Separator";
import { SidebarInset, SidebarTrigger } from "@/core/components/ui/admin-desk/sidebar/AllComponentsSidebar";
import type { NavItem } from "@/core/interfaces/NavItem";
import AdminDeskSkeleton from "@/core/components/ui/skeletons/AdminDeskSkeleton";
import type { PropsWithChildren } from "react";

interface InsetProps extends PropsWithChildren {
    readonly filteredNavItems: NavItem[];
    readonly pathname: string;
}

export default function Inset({ filteredNavItems, pathname }: InsetProps) {
    return (
        <SidebarInset>
            <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4">
                <SidebarTrigger className="-ml-2" />
                <Separator orientation="vertical" className="h-6" />
                <h1 className="text-lg font-semibold text-foreground">
                    {filteredNavItems.find((item) => item.href === pathname)?.title || "dashboard"}
                </h1>
            </header>
            <main className="flex-1 p-6 bg-background-document/10">
                <Suspense fallback={<AdminDeskSkeleton />}>
                    <Outlet />
                </Suspense>
            </main>
        </SidebarInset>
    );
}
