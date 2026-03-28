import { Button } from "@/core/components/buttons/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/core/components/ui/card";
import { useCreateModuleForm } from "@/features/modules/application/hooks";
import { ModuleForm } from "@/features/modules/presentation/components/ModuleForm";
import { PlusCircle } from "lucide-react";


export default function CreateModuleForm() {

    const { register, handleSubmit, errors, onSubmit } = useCreateModuleForm();

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <PlusCircle className="h-5 w-5 text-primary" />
                    Registrar Módulo
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <ModuleForm register={register} errors={errors} />
                    <Button type="submit" className="w-full">Registrar</Button>
                </form>
            </CardContent>
        </Card>
    );
}