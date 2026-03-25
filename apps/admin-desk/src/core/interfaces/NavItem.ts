import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

import { type SystemPermission } from "@salc/core/enums/Permissions";

type Icon = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>

export interface NavItem {
    title: string;
    description: string;
    href: string;
    icon: Icon;
    permissions: SystemPermission[];
    color: string;
}
