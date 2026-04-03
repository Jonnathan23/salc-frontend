import { LogOut } from "lucide-react";

import { SidebarFooter } from "./all-components-sidebar";
import { Button } from "@/core/components/buttons/button";
import type { UserAuthResponseEntity } from "@salc/core/features/shared/indentiy/domain/entities";


interface FooterSidebarProps {
    userResponse: UserAuthResponseEntity;
    logout: () => void;
}

export default function FooterSidebar({ userResponse, logout }: FooterSidebarProps) {


    return (
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
    );
}