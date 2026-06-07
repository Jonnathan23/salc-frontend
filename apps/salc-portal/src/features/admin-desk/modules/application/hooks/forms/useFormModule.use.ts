import { useForm } from "react-hook-form";
import type { BaseModuleFormValues } from "@/features/admin-desk/modules/presentation/interfaces/BaseFormValues.interface";
import { ModulePresentationMapper } from "@/features/admin-desk/modules/presentation/mappers/module.mapper";
import { useCreateModule, useUpdateModule } from "@/features/admin-desk/modules/application/hooks";
import type { ModuleEntity } from "@salc/core/features/admin-desk/modules/domain/entities/Module.entity";
import type { Dispatch, SetStateAction } from "react";

export const useCreateModuleForm = () => {
    const defaultValues: BaseModuleFormValues = { name: "", description: "", level: 1 };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<BaseModuleFormValues>({ defaultValues });

    const { mutate: createModule, isPending } = useCreateModule({ reset });

    const onSubmit = (data: BaseModuleFormValues) => {
        const dto = ModulePresentationMapper.toCreateDto(data);

        if (dto) {
            createModule(dto);
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        onSubmit,
        isPending,
    };
};

interface UpdateModuleProps {
    module: ModuleEntity;
    setModuleSelected: Dispatch<SetStateAction<ModuleEntity | null>>;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
}

export const useUpdateModuleForm = ({ module, setModuleSelected, setIsEditing }: UpdateModuleProps) => {
    const { moduleId, name, description, level } = module;
    const defaultValues: BaseModuleFormValues = { name, description, level };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<BaseModuleFormValues>({ defaultValues });

    const { mutate: updateModule, isPending } = useUpdateModule({ reset, setModuleSelected, setIsEditing });

    const onSubmit = (data: BaseModuleFormValues) => {
        const dto = ModulePresentationMapper.toUpdateDto(data);

        if (dto) {
            updateModule({ id: moduleId, data: dto });
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        onSubmit,
        isPending,
        setValue,
    };
};
