import type { NavItem } from "@/core/interfaces/NavItem";
import { systemPermissions } from "@salc/core/enums/Permissions";
import { Database, Layers, LayoutDashboard, UserPlus, Users } from "lucide-react";


export const navItems: NavItem[] = [
    {
        title: 'Dashboard',
        description: 'Panel de control',
        href: '/',
        icon: LayoutDashboard,
        permissions: [],
        color: 'bg-accent',
    },
    {
        title: 'Migración de Datos',
        description: 'Importar datos de sistemas externos',
        href: '/data-migration',
        icon: Database,
        permissions: [systemPermissions.SHARED_IDENTITY_WRITE], // Solo Admin
        color: 'bg-accent',
    },
    {
        title: 'Matrícula de Estudiantes',
        description: 'Registrar nuevos estudiantes y asignar módulos',
        href: '/student-onboarding',
        icon: UserPlus,
        permissions: [systemPermissions.ADMINDESK_STUDENTS_WRITE], // Admin y Advisor
        color: 'bg-primary',
    },
    {
        title: 'Niveles de Estudiantes',
        description: 'Ver progreso y gestionar niveles',
        href: '/student-levels',
        icon: Layers,
        permissions: [systemPermissions.ADMINDESK_CONTRACTS_READ], // Admin, Advisor, Academic Director
        color: 'bg-secondary',
    },
    {
        title: 'Registro de Usuarios',
        description: 'Crear cuentas para administradores y profesores',
        href: '/new-user',
        icon: Users,
        permissions: [systemPermissions.SHARED_IDENTITY_WRITE], // Solo Admin
        color: 'bg-muted',
    },
    {
        title: 'Ver Usuarios',
        description: 'Ver cuentas para administradores y profesores',
        href: '/view-users',
        icon: Users,
        permissions: [],
        color: 'bg-muted',
    },
    {
        title: 'Ver Módulos',
        description: 'Ver módulos',
        href: '/modules',
        icon: Users,
        permissions: [systemPermissions.ADMINDESK_MODULES_READ],
        color: 'bg-muted',
    },
]