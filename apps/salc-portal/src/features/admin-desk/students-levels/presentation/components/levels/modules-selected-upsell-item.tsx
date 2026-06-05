import { Button } from "@/core/components/admin-desk/buttons/button";
import type { ModuleEntity } from "@salc/core/features/admin-desk/modules/domain/entities/Module.entity";
import { X } from "lucide-react";

interface ModulesSelectedForUpsellItemProps {
    module: ModuleEntity;

    handleRemoveModulesForUpsell: (removeModule: ModuleEntity) => void;
}

export default function ModulesSelectedForUpsellItem({
    module,
    handleRemoveModulesForUpsell,
}: ModulesSelectedForUpsellItemProps) {
    return (
        <div className="flex items-center justify-between rounded-lg border p-3">
            <div>
                <p className="text-sm font-medium text-destructive">{module.mo_name}</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => handleRemoveModulesForUpsell(module)}>
                <X className="mr-1 h-3 w-3" />
                Eliminar
            </Button>
        </div>
    );
}
