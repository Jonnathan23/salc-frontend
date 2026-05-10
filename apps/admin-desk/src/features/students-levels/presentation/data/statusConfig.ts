import { Play, CheckCircle, Lock } from "lucide-react"

import type { StudentModuleStatus } from "@salc/core/features/admin-desk/students-level/domain/interfaces/StudentLevels.interface"

interface StudentLevelConfig {
    label: string
    variant: 'default' | 'secondary' | 'outline'
    icon: React.ElementType
    className: string
}


export const statusConfig: Record<StudentModuleStatus, StudentLevelConfig> = {
    ACTIVE: {
        label: 'Activo',
        variant: 'default',
        icon: Play,
        className: 'bg-primary text-primary-foreground',
    },
    APPROVED: {
        label: 'Aprobado',
        variant: 'secondary',
        icon: CheckCircle,
        className: 'bg-success text-success-foreground',
    },
    LOCKED: {
        label: 'Bloqueado',
        variant: 'outline',
        icon: Lock,
        className: '',
    },
}