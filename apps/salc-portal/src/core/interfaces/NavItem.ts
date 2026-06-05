import type { LucideIcon, LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

import { type SystemPermission } from "@salc/core/enums/Permissions";

type Icon = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;

export interface NavItem {
    title: string;
    description: string;
    href: string;
    icon: Icon;
    permissions: SystemPermission[];
    color: string;
}

export type ClassTrackView = "dashboard" | "access-control" | "retention" | "performance" | "student-profile";

export interface ClassTrackNavItem {
    label: string;
    view: ClassTrackView;
    icon: LucideIcon;
    href: string;
    permissions: SystemPermission[];
}
