import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

type Icon = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>

export interface NavItem {
    title: string;
    description: string;
    href: string;
    icon: Icon;
    adminOnly: boolean;
    color: string;
}
