import { Plus } from "lucide-react";

import { Button } from "@/core/components/buttons/button";
import type { ModuleEntity } from "@salc/core/features/admin-desk/modules/domain/entities/Module.entity";

interface AvailableModulesForUpsellProps {
    module: ModuleEntity;
    handleAddModule: (moduleId: string) => void
    isDisabled: boolean
}

export default function AvailableModulesForUpsell({ module, handleAddModule, isDisabled }: AvailableModulesForUpsellProps) {
    return (
        <div className="flex items-center justify-between rounded-lg border p-3"        >
            <div>
                <p className="text-sm font-medium text-foreground">{module.mo_name}</p>
            </div>
            <Button
                size="sm"
                variant="outline"
                onClick={() => handleAddModule(module.mo_id)}
                disabled={isDisabled}
            >
                <Plus className="mr-1 h-3 w-3" />
                Agregar
            </Button>
        </div>
    );
}
