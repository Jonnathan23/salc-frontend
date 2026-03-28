import { useForm } from "react-hook-form";
import type { CreateModuleDto, UpdateModuleDto } from "@salc/core/features/admin-desk/modules/domain/dtos";
import { useCreateModule, useUpdateModule } from "@/features/modules/application/hooks";
import type { ModuleEntity } from "@salc/core/features/admin-desk/modules/domain/entities/Module.entity";

export const useCreateModuleForm = () => {
    const defaultValues: CreateModuleDto = { mo_name: '', mo_description: '' };

    const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateModuleDto>({ defaultValues });

    const { mutate: createModule } = useCreateModule({ reset });

    const onSubmit = (data: CreateModuleDto) => {
        createModule(data);
    }

    return {
        register,
        handleSubmit,
        errors,
        onSubmit,

    }
}

interface useUpdateModuleProps {
    module: ModuleEntity;
}

export const useUpdateModuleForm = ({ module }: useUpdateModuleProps) => {

    const { mo_id, mo_name, mo_description } = module;
    const defaultValues: UpdateModuleDto = { mo_name, mo_description };

    const { register, handleSubmit, formState: { errors }, reset } = useForm<UpdateModuleDto>({ defaultValues });

    const { mutate: updateModule } = useUpdateModule({ reset });

    const onSubmit = (data: UpdateModuleDto) => {
        updateModule({ id: mo_id, data });
    }

    return {
        register,
        handleSubmit,
        errors,
        onSubmit,
    }
}