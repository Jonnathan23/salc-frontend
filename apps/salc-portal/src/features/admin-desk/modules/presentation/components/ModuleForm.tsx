import { Input } from "@/core/components/ui/Input";
import { Label } from "@/core/components/ui/Label";
import { Textarea } from "@/core/components/ui/Textarea";
import type { CreateModuleDto, UpdateModuleDto } from "@salc/core/features/admin-desk/modules/domain/dtos";
import type { FieldErrors, UseFormRegister } from "react-hook-Form";

interface ModuleFormProps {
    register: UseFormRegister<CreateModuleDto> | UseFormRegister<UpdateModuleDto>;
    errors: FieldErrors<CreateModuleDto> | FieldErrors<UpdateModuleDto>;
}

export const ModuleForm = ({ register, errors }: ModuleFormProps) => {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="mo_name">Nombre del módulo</Label>
                <Input
                    id="mo_name"
                    placeholder="Ej: A1 - Principiante"
                    type="text"
                    {...register("mo_name", {
                        required: "El nombre es requerido",
                        minLength: {
                            value: 2,
                            message: "El nombre debe tener al menos 2 caracteres",
                        },
                        maxLength: {
                            value: 50,
                            message: "El nombre debe tener menos de 50 caracteres",
                        },
                    })}
                    aria-invalid={!!errors.mo_name}
                />
                {errors.mo_name && <span className="text-sm text-destructive">{errors.mo_name.message}</span>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="mo_level">Número del módulo</Label>
                <Input
                    id="mo_level"
                    placeholder="Ej: 1"
                    type="number"
                    {...register("mo_level", {
                        required: "El nivel es requerido",
                        min: {
                            value: 1,
                            message: "El nivel debe ser mayor a 0",
                        },
                        max: {
                            value: 6,
                            message: "El nivel debe ser menor a 6",
                        },
                    })}
                    aria-invalid={!!errors.mo_level}
                />
                {errors.mo_level && <span className="text-sm text-destructive">{errors.mo_level.message}</span>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="mo_description">Descripción del módulo</Label>
                <Textarea
                    id="mo_description"
                    placeholder="Describe los objetivos del módulo..."
                    {...register("mo_description", {
                        required: "La descripción es requerida",
                        minLength: {
                            value: 3,
                            message: "La descripción debe tener al menos 3 caracteres",
                        },
                        maxLength: {
                            value: 255,
                            message: "La descripción debe tener menos de 255 caracteres",
                        },
                    })}
                    aria-invalid={!!errors.mo_description}
                />
                {errors.mo_description && <span className="text-sm text-destructive">{errors.mo_description.message}</span>}
            </div>
        </div>
    );
};
