import { Button } from "@/core/components/ui/admin-desk/buttons/Button";
import type { TimelineAvailableModule } from "@salc/core/features/admin-desk/students-level/domain/entities/StudentTimelineProjection.entity";
import { X } from "lucide-react";

interface ModulesSelectedForUpsellItemProps {
    readonly module: TimelineAvailableModule;

    readonly handleRemoveModulesForUpsell: (removeModule: TimelineAvailableModule) => void;
}

export default function ModulesSelectedForUpsellItem(props: ModulesSelectedForUpsellItemProps) {
    const { module, handleRemoveModulesForUpsell } = props;

    return (
        <div className="flex items-center justify-between rounded-lg border p-3">
            <div>
                <p className="text-sm font-medium text-destructive">{module.name}</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => handleRemoveModulesForUpsell(module)}>
                <X className="mr-1 h-3 w-3" />
                Eliminar
            </Button>
        </div>
    );
}
