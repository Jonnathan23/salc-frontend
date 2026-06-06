import { Badge } from "@/core/components/ui/Badge";
import { statusConfig } from "@/features/admin-desk/students-levels/presentation/enums/statusConfig";
import type { StudentLevelDetailsEntity } from "@salc/core/features/admin-desk/students-level/domain/entities";
import type { ClassValue } from "class-variance-authority/types";

interface StudentLevelItemProps {
    level: StudentLevelDetailsEntity;

    cnFunction: (...inputs: ClassValue[]) => string;
}

export default function StudentLevelItem({ level, cnFunction }: StudentLevelItemProps) {
    const config = statusConfig[level.status];
    const Icon = config.icon;

    return (
        <div key={level.id} className="relative flex items-start gap-4">
            <div
                className={cnFunction(
                    "absolute -left-6 flex h-4 w-4 items-center justify-center rounded-full border-2 bg-background",
                    level.status === "APPROVED"
                        ? "border-success"
                        : level.status === "ACTIVE"
                          ? "border-primary"
                          : "border-muted-foreground",
                )}
            >
                <div
                    className={cnFunction(
                        "h-2 w-2 rounded-full",
                        level.status === "APPROVED"
                            ? "bg-success"
                            : level.status === "ACTIVE"
                              ? "bg-primary"
                              : "bg-muted-foreground",
                    )}
                />
            </div>

            <div className="flex-1 rounded-lg border p-3">
                <div className="flex items-center justify-between">
                    <p className="font-medium text-foreground">{level.module.mo_name}</p>
                    <Badge variant={config.variant} className={config.className}>
                        <Icon className="mr-1 h-3 w-3" />
                        {config.label}
                    </Badge>
                </div>
            </div>
        </div>
    );
}
