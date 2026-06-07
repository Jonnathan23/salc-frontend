import { Button } from "@/core/components/ui/admin-desk/buttons/Button";
import { Card, CardContent, CardFooter, CardHeader } from "@/core/components/ui/Card";
import { Badge } from "@/core/components/ui/class-track/Badge";
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
    const { name, description, level, createdAt } = module;
    const formattedDate = new Intl.DateTimeFormat("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(createdAt || ""));

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
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-foreground/90">{name}</h3>
                        <Badge variant="outline" className="text-xs bg-primary/5 text-primary border-primary/20">
                            Nivel {level}
                        </Badge>
                    </div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
                        Creado el {formattedDate}
                    </span>
                </div>
            </CardHeader>
            <CardContent className="flex-1 pt-4">
                <p className="text-sm text-foreground/70 line-clamp-2 mt-1">{description}</p>
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
