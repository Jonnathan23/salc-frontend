import { Controller } from "react-hook-form";

import { useGetAllModules } from "@/features/modules/application/hooks";
import { Label } from "@/core/components/ui/label";
import { Checkbox } from "@/core/components/ui/checkbox";


export default function AddModulesForStudent() {

        const { data: modules } = useGetAllModules();

    return (
        <div className="space-y-4">
            <div>
                <Label className="text-base">Módulos a Inscribir</Label>
                <p className="text-sm text-muted-foreground">
                    Selecciona los módulos en los que se inscribirá el estudiante.
                </p>
            </div>
            <Controller
                name="selectedModules"
                control={control}
                render={({ field }) => (
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {modules.map((module) => (
                            <div
                                key={module.id}
                                className={cn(
                                    'flex items-start space-x-3 rounded-lg border p-4 transition-colors',
                                    field.value.includes(module.id)
                                        ? 'border-primary bg-primary/5'
                                        : 'border-border hover:border-primary/50'
                                )}
                            >
                                <Checkbox
                                    id={module.id}
                                    checked={field.value.includes(module.id)}
                                    onCheckedChange={(checked) =>
                                        handleModuleToggle(
                                            module.id,
                                            checked === true,
                                            field.onChange,
                                            field.value
                                        )
                                    }
                                />
                                <div className="space-y-1">
                                    <label
                                        htmlFor={module.id}
                                        className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {module.name}
                                    </label>
                                    {module.description && (
                                        <p className="text-xs text-muted-foreground">
                                            {module.description}
                                        </p>
                                    )}
                                    {module.price && (
                                        <p className="text-xs font-medium text-primary">
                                            ${module.price} MXN
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            />
            {errors.selectedModules && (
                <p className="text-sm text-destructive">{errors.selectedModules.message}</p>
            )}
        </div>

                        {
        selectedModules.length > 0 && (
            <div className="rounded-lg bg-muted p-4">
                <p className="text-sm font-medium text-foreground">
                    Resumen: {selectedModules.length} módulo(s) seleccionado(s)
                </p>
                <p className="text-sm text-muted-foreground">
                    Total estimado: $
                    {MOCK_MODULES.filter((m) => selectedModules.includes(m.id))
                        .reduce((sum, m) => sum + (m.price || 0), 0)}{' '}
                    MXN
                </p>
            </div>
        )
    }
    );
}
