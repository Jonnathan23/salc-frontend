import type { ClassTrackNavItem } from "@/core/interfaces/NavItem";
import { LayoutDashboard, ShieldCheck, AlertTriangle, BarChart2, Users } from "lucide-react";

export const classTrackNavItems: ClassTrackNavItem[] = [
    {
        label: "Resumen General",
        view: "dashboard",
        icon: LayoutDashboard,
        href: "/",
    },
    {
        label: "Control de Acceso",
        view: "access-control",
        icon: ShieldCheck,
        href: "/",
    },
    {
        label: "Centro de Retención",
        view: "retention",
        icon: AlertTriangle,
        href: "/",
    },
    {
        label: "Rendimiento",
        view: "performance",
        icon: BarChart2,
        href: "/",
    },
    {
        label: "Perfiles",
        view: "student-profile",
        icon: Users,
        href: "/",
    },
];
