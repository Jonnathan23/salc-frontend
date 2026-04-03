import { SidebarHeader } from "@/core/components/sidebar/all-components-sidebar";



export default function HeaderSidebar() {
    return (
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
    );
}
