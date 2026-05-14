import type { NavItem } from "@/core/interfaces/NavItem";
import { systemPermissions } from "@salc/core/enums/Permissions";
import { BookPlus, Database, Layers, LayoutDashboard, Package, School, UserPlus, UserRoundSearch } from "lucide-react";


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
        href: '/tuition-student',
        icon: BookPlus,
        permissions: [systemPermissions.ADMINDESK_STUDENTS_WRITE], // Admin y Advisor
        color: 'bg-primary',
    },
    {
        title: 'Niveles de Estudiantes',
        description: 'Ver progreso y gestionar niveles',
        href: '/students-levels',
        icon: Layers,
        permissions: [systemPermissions.ADMINDESK_CONTRACTS_READ], // Admin, Advisor, Academic Director
        color: 'bg-secondary',
    },
    {
        title: 'Ver Estudiantes',
        description: 'Ver estudiantes',
        href: '/view-students',
        icon: School,
        permissions: [systemPermissions.ADMINDESK_STUDENTS_READ], // Admin y Advisor
        color: 'bg-primary',
    },
    {
        title: 'Registro de Usuarios',
        description: 'Crear cuentas para administradores y profesores',
        href: '/new-user',
        icon: UserPlus,
        permissions: [systemPermissions.SHARED_IDENTITY_WRITE], // Solo Admin
        color: 'bg-muted',
    },
    {
        title: 'Ver Perfiles',
        description: 'Ver cuentas para administradores y profesores',
        href: '/view-profiles',
        icon: UserRoundSearch,
        permissions: [systemPermissions.SHARED_IDENTITY_READ],
        color: 'bg-accent',
    },
    {
        title: 'Ver Módulos',
        description: 'Ver módulos',
        href: '/modules',
        icon: Package,
        permissions: [systemPermissions.ADMINDESK_MODULES_READ],
        color: 'bg-muted',
    },
]