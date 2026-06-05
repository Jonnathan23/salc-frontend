import { useForm } from "react-hook-form";
import type { CreateModuleDto, UpdateModuleDto } from "@salc/core/features/admin-desk/modules/domain/dtos";
import { useCreateModule, useUpdateModule } from "@/features/admin-desk/modules/application/hooks";
import type { ModuleEntity } from "@salc/core/features/admin-desk/modules/domain/entities/Module.entity";
import type { Dispatch, SetStateAction } from "react";

export const useCreateModuleForm = () => {
    const defaultValues: CreateModuleDto = { mo_name: '', mo_description: '', mo_level: 1 };

    const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateModuleDto>({ defaultValues });

    const { mutate: createModule, isPending } = useCreateModule({ reset });

    const onSubmit = (data: CreateModuleDto) => {
        createModule(data);
    }

    return {
        register,
        handleSubmit,
        errors,
        onSubmit,
        isPending

    }
}

interface useUpdateModuleProps {
    module: ModuleEntity;
    setModuleSelected: Dispatch<SetStateAction<ModuleEntity | null>>
    setIsEditing: Dispatch<SetStateAction<boolean>>
}

export const useUpdateModuleForm = ({ module, setModuleSelected, setIsEditing }: useUpdateModuleProps) => {

    const { mo_id, mo_name, mo_description, mo_level } = module;
    const defaultValues: UpdateModuleDto = { mo_name, mo_description, mo_level };

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<UpdateModuleDto>({ defaultValues });

    const { mutate: updateModule, isPending } = useUpdateModule({ reset, setModuleSelected, setIsEditing });

    const onSubmit = (data: UpdateModuleDto) => {
        updateModule({ id: mo_id, data });
    }

    return {
        register,
        handleSubmit,
        errors,
        onSubmit,
        isPending,
        setValue
    }
}