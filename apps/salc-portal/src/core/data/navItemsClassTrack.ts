import type { NavItem } from "@/core/interfaces/NavItem";
import { systemPermissions } from "@salc/core/enums/Permissions";
import { LayoutDashboard, ShieldCheck, AlertTriangle, School } from "lucide-react";

const baseUrl = "/class-track";

export const classTrackNavItems: NavItem[] = [
    {
        title: "Resumen General",
        description: "Resumen General",
        icon: LayoutDashboard,
        href: baseUrl + "/dashboard",
        permissions: [],
        color: "bg-primary",
    },
    {
        title: "Control de Acceso",
        description: "Control de Acceso",
        icon: ShieldCheck,
        href: baseUrl + "/acces-control",
        permissions: [systemPermissions.CLASSTRACK_ATTENDANCE_READ],
        color: "bg-secondary",
    },
    {
        title: "Centro de Retención",
        description: "Centro de Retención",
        icon: AlertTriangle,
        href: baseUrl + "/retention-center",
        permissions: [systemPermissions.CLASSTRACK_RETENTION_ALERTS_READ, systemPermissions.CLASSTRACK_RETENTION_ALERTS_WRITE],
        color: "bg-accent",
    },
    /*
    TODO:
    {
        title: "Rendimiento",
        description: "Rendimiento",
        icon: BarChart2,
        href: baseUrl + "/performance",
        permissions: [systemPermissions.CLASSTRACK_ATTENDANCE_READ],
        color: "bg-primary",
    },
    */
    {
        title: "Ver Estudiantes",
        description: "Diccionario de Estudiantes",
        icon: School,
        href: baseUrl + "/view-students",
        permissions: [systemPermissions.ADMINDESK_STUDENTS_READ],
        color: "bg-secondary",
    },
];
