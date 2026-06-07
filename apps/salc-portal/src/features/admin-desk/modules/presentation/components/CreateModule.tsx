import { Button } from "@/core/components/ui/admin-desk/buttons/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/core/components/ui/Card";
import { useCreateModuleForm } from "@/features/admin-desk/modules/application/hooks";
import { ModuleForm } from "@/features/admin-desk/modules/presentation/components/ModuleForm";
import { Loader2, PlusCircle } from "lucide-react";

export default function CreateModuleForm() {
    const { register, handleSubmit, errors, onSubmit, isPending } = useCreateModuleForm();

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

                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? (
                            <div className="flex items-center justify-center">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span className="ml-2">Registrando...</span>
                            </div>
                        ) : (
                            "Registrar"
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
