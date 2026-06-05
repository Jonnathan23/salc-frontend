import { Button } from "@/core/components/admin-desk/buttons/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/core/components/ui/card";
import type { ModuleEntity } from "@salc/core/features/admin-desk/modules/domain/entities/Module.entity";
import { Layers3, Pencil, Trash2 } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

interface ModuleItemProps {
    module: ModuleEntity;
    setModuleSelected: Dispatch<SetStateAction<ModuleEntity | null>>;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
    canWrite?: boolean;
}

export default function ModuleItem({ module, setModuleSelected, setIsEditing, canWrite = false }: ModuleItemProps) {
    const handleSelectedModule = () => {
        setModuleSelected(module);
        setIsEditing(true);
    };

    return (
        <Card className="group flex h-full flex-col transition-all hover:border-primary hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-3 border-b ">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <Layers3 className="h-6 w-6" />
                </div>
                <div
                    className="flex-1 space-y-1 cursor-pointer hover:text-primary transition-colors"
                    onClick={handleSelectedModule}
                >
                    <CardTitle className="text-xl font-bold text-foreground hover:text-primary transition-colors">
                        {module.mo_name}
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="flex-1 pt-4">
                <p className="text-sm text-muted-foreground line-clamp-3">{module.mo_description}</p>
            </CardContent>
            {canWrite && (
                <CardFooter className="flex justify-end gap-2 pt-2 border-t mt-auto">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-primary"
                        onClick={handleSelectedModule}
                    >
                        <Pencil className="mr-2 h-4 w-4" /> Editar
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
}
