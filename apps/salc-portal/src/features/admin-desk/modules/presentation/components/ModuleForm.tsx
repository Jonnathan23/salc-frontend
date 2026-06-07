import { Input } from "@/core/components/ui/Input";
import { Label } from "@/core/components/ui/Label";
import { Textarea } from "@/core/components/ui/Textarea";

import { BookOpen, Hash, AlignLeft } from "lucide-react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { BaseModuleFormValues } from "@/features/admin-desk/modules/presentation/interfaces/BaseFormValues.interface";
import { cn } from "@salc/ui/lib/utils";

interface ModuleFormProps {
    register: UseFormRegister<BaseModuleFormValues>;
    errors: FieldErrors<BaseModuleFormValues>;
}

export const ModuleForm = ({ register, errors }: ModuleFormProps) => {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Nombre del módulo</Label>
                <div className="relative">
                    <Input
                        id="name"
                        placeholder="Ej: Módulo 1 - Iniciación"
                        {...register("name", {
                            required: "Este campo es requerido",
                        })}
                        className={cn("pl-10", errors.name && "border-destructive focus-visible:ring-destructive")}
                        aria-invalid={!!errors.name}
                    />
                    <BookOpen className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
                {errors.name && <span className="text-sm text-destructive">{errors.name.message}</span>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="level">Número del módulo</Label>
                <div className="relative">
                    <Input
                        id="level"
                        type="number"
                        placeholder="Ej: 1"
                        {...register("level", {
                            required: "Este campo es requerido",
                            valueAsNumber: true,
                            min: { value: 1, message: "El nivel mínimo es 1" },
                            max: { value: 6, message: "El nivel máximo es 6" },
                        })}
                        className={cn("pl-10", errors.level && "border-destructive focus-visible:ring-destructive")}
                        aria-invalid={!!errors.level}
                    />
                    <Hash className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
                {errors.level && <span className="text-sm text-destructive">{errors.level.message}</span>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Descripción del módulo</Label>
                <div className="relative">
                    <Textarea
                        id="description"
                        placeholder="Describe los objetivos y contenido principal del módulo..."
                        {...register("description", {
                            required: "Este campo es requerido",
                            minLength: {
                                value: 10,
                                message: "La descripción debe tener al menos 10 caracteres",
                            },
                        })}
                        className={cn(
                            "min-h-[120px] resize-none pl-10 pt-3",
                            errors.description && "border-destructive focus-visible:ring-destructive",
                        )}
                        aria-invalid={!!errors.description}
                    />
                    <AlignLeft className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                </div>
                {errors.description && <span className="text-sm text-destructive">{errors.description.message}</span>}
            </div>
        </div>
    );
};
