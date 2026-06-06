import { Play, CheckCircle, Lock } from "lucide-react";

import {
    studentModuleStatus,
    type StudentModuleStatus,
} from "@salc/core/features/admin-desk/students-level/domain/interfaces/StudentLevels.interface";

interface StudentLevelConfig {
    label: string;
    variant: "default" | "secondary" | "outline";
    icon: React.ElementType;
    className: string;
}

export const statusConfig: Record<StudentModuleStatus, StudentLevelConfig> = {
    [studentModuleStatus.ACTIVE]: {
        label: "Activo",
        variant: "default",
        icon: Play,
        className: "bg-primary text-primary-foreground",
    },
    [studentModuleStatus.APPROVED]: {
        label: "Aprobado",
        variant: "secondary",
        icon: CheckCircle,
        className: "bg-success text-success-foreground",
    },
    [studentModuleStatus.LOCKED]: {
        label: "Bloqueado",
        variant: "outline",
        icon: Lock,
        className: "",
    },
};
