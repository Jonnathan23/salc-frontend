import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import { Textarea } from "@/core/components/ui/textarea";
import type { CreateModuleDto, UpdateModuleDto } from "@salc/core/features/admin-desk/modules/domain/dtos";
import type { FieldErrors, UseFormRegister } from "react-hook-form";


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
                    {...register("mo_name")} 
                    aria-invalid={!!errors.mo_name} 
                />
                {errors.mo_name && <span className="text-sm text-destructive">{errors.mo_name.message}</span>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="mo_description">Descripción del módulo</Label>
                <Textarea 
                    id="mo_description" 
                    placeholder="Describe los objetivos del módulo..." 
                    {...register("mo_description")} 
                    aria-invalid={!!errors.mo_description} 
                />
                {errors.mo_description && <span className="text-sm text-destructive">{errors.mo_description.message}</span>}
            </div>
        </div>
    )
}