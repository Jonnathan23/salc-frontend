import { Button } from "@/core/components/buttons/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/core/components/ui/card";
import { useUpdateModuleForm } from "@/features/modules/application/hooks";
import { ModuleForm } from "@/features/modules/presentation/components/ModuleForm";
import type { ModuleEntity } from "@salc/core/features/admin-desk/modules/domain/entities/Module.entity";
import { Pencil } from "lucide-react";


interface UpdateModuleFormProps {
    module: ModuleEntity;
}

export default function UpdateModuleForm({ module }: UpdateModuleFormProps) {

    const { register, handleSubmit, errors, onSubmit } = useUpdateModuleForm({ module });

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
                    <Button type="submit" className="w-full">Actualizar</Button>
                </form>
            </CardContent>
        </Card>
    );
}