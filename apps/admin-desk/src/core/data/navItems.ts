import type { NavItem } from "@/core/interfaces/NavItem";
import { Database, Layers, LayoutDashboard, UserPlus, Users } from "lucide-react";


export const navItems: NavItem[] = [
    {
        title: 'Dashboard',
        description: 'Panel de control',
        href: '/',
        icon: LayoutDashboard,
        adminOnly: false,
        color: 'bg-accent',
    },
    {
        title: 'Migración de Datos',
        description: 'Importar datos de sistemas externos',
        href: '/data-migration',
        icon: Database,
        adminOnly: true,
        color: 'bg-accent',
    },
    {
        title: 'Matrícula de Estudiantes',
        description: 'Registrar nuevos estudiantes y asignar módulos',
        href: '/student-onboarding',
        icon: UserPlus,
        adminOnly: false,
        color: 'bg-primary',
    },
    {
        title: 'Niveles de Estudiantes',
        description: 'Ver progreso y gestionar niveles',
        href: '/student-levels',
        icon: Layers,
        adminOnly: false,
        color: 'bg-secondary',
    },
    {
        title: 'Registro de Usuarios',
        description: 'Crear cuentas para administradores y profesores',
        href: '/new-user',
        icon: Users,
        adminOnly: true,
        color: 'bg-muted',
    },
]