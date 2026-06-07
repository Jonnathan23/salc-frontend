import { Plus } from "lucide-react";

import { Button } from "@/core/components/ui/admin-desk/buttons/Button";
import type { ModuleEntity } from "@salc/core/features/admin-desk/modules/domain/entities/Module.entity";

interface AvailableModulesForUpsellProps {
    module: ModuleEntity;
    modulesSelectedForUpsell: ModuleEntity[];
    handleAddModulesForUpsell: (newModule: ModuleEntity) => void;
}

export default function AvailableModulesForUpsell({
    module,
    modulesSelectedForUpsell,
    handleAddModulesForUpsell,
}: AvailableModulesForUpsellProps) {
    const isDisabled = modulesSelectedForUpsell.some((moduleSelected) => moduleSelected.moduleId === module.moduleId);

    return (
        <div className="flex items-center justify-between rounded-lg border p-3">
            <div>
                <p className={`text-sm font-medium ${isDisabled ? "text-primary" : "text-foreground"}`}>{module.name}</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => handleAddModulesForUpsell(module)} disabled={isDisabled}>
                <Plus className={`${isDisabled ? "text-primary" : "text-foreground"} mr-1 h-3 w-3`} />
                {isDisabled ? "Agregado" : "Agregar"}
            </Button>
        </div>
    );
}
