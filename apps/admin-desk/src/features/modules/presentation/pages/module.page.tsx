import { useState } from "react";

import { useAuthStore } from "@/features/indentity/application/store/auth.store";
import { useGetAllModules } from "@/features/modules/application/hooks";
import CreateModuleForm from "@/features/modules/presentation/components/CreateModule";
import ModuleItem from "@/features/modules/presentation/components/ModuleItem";
import UpdateModuleForm from "@/features/modules/presentation/components/UpdateModule";
import { systemPermissions } from "@salc/core/enums/Permissions";
import type { ModuleEntity } from "@salc/core/features/admin-desk/modules/domain/entities/Module.entity";
import { BookOpenText, Loader2 } from "lucide-react";


export default function ModulePage() {

    const { userResponse } = useAuthStore();

    const canWrite = userResponse?.permissions.includes(systemPermissions.ADMINDESK_MODULES_WRITE) ?? false;
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isPending, setIsPending] = useState<boolean>(false);
    const [moduleSelected, setModuleSelected] = useState<ModuleEntity | null>(null);

    const { data: response, isLoading, error } = useGetAllModules();

    const modules = response?.data ?? [];

    console.log(modules);


    if (isLoading) return (
        <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
    );

    if (error) return (
        <div className="text-destructive p-4 border border-destructive bg-destructive/10 rounded-md">
            Error al cargar modulos: {error.message}
        </div>
    );

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-3 border-b pb-6">
                <BookOpenText className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                    Módulos Académicos
                </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <article
                    className="lg:col-span-1"
                    hidden={!canWrite}
                >
                    {isEditing && moduleSelected ? (
                        <UpdateModuleForm module={moduleSelected} setModuleSelected={setModuleSelected} setIsEditing={setIsEditing} setIsPending={setIsPending} />
                    ) : (
                        <CreateModuleForm />
                    )}

                    {/* Botón rápido para cancelar edición y limpiar el panel */}
                    {isEditing && !isPending && (
                        <div className="mt-4 text-center">
                            <button
                                className="text-sm text-muted-foreground underline hover:text-primary transition-colors cursor-pointer"
                                onClick={() => {
                                    setIsEditing(false);
                                    setModuleSelected(null);
                                }}
                            >
                                Cancelar edición y registrar uno nuevo
                            </button>
                        </div>
                    )}
                </article>

                <article className="lg:col-span-2">
                    <div className="grid gap-6 sm:grid-cols-2">
                        {modules.map((module) => (
                            <ModuleItem
                                key={module.mo_id}
                                module={module}
                                setModuleSelected={setModuleSelected}
                                setIsEditing={setIsEditing}
                                canWrite={canWrite}
                            />
                        ))}
                        {modules.length === 0 && (
                            <p className="text-muted-foreground col-span-2">No hay módulos registrados.</p>
                        )}
                    </div>
                </article>



            </div>
        </div>
    );
}
