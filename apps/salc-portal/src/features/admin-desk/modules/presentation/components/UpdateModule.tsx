import { Button } from "@/core/components/ui/admin-desk/buttons/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/core/components/ui/Card";
import { useUpdateModuleForm } from "@/features/admin-desk/modules/application/hooks";
import { ModuleForm } from "@/features/admin-desk/modules/presentation/components/ModuleForm";
import type { ModuleEntity } from "@salc/core/features/admin-desk/modules/domain/entities/Module.entity";
import { Loader2, Pencil } from "lucide-react";
import { useEffect, type Dispatch, type SetStateAction } from "react";

interface UpdateModuleFormProps {
    module: ModuleEntity;
    setModuleSelected: Dispatch<SetStateAction<ModuleEntity | null>>;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
    setIsPending: Dispatch<SetStateAction<boolean>>;
}

export default function UpdateModuleForm({ module, setModuleSelected, setIsEditing, setIsPending }: UpdateModuleFormProps) {
    const { register, handleSubmit, errors, onSubmit, isPending, setValue } = useUpdateModuleForm({
        module,
        setModuleSelected,
        setIsEditing,
    });

    useEffect(() => {
        if (module) {
            setValue("name", module.name);
            setValue("description", module.description);
            setValue("level", module.level);
        }
    }, [module, setValue]);

    useEffect(() => {
        setIsPending(isPending);
    }, [isPending, setIsPending]);

    return (
        <Card className="border-primary">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                    <Pencil className="h-5 w-5" />
                    Actualizar Módulo
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <ModuleForm register={register} errors={errors} />
                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? (
                            <div className="flex items-center justify-center">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span className="ml-2">Actualizando...</span>
                            </div>
                        ) : (
                            "Actualizar"
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
