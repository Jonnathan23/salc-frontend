import { useForm } from "react-hook-form";
import type { CreateModuleDto } from "@salc/core/features/admin-desk/modules/domain/dtos";

export const useCreateModule = () => {
    const defaultValues: CreateModuleDto = { mo_name: '', mo_description: '' };

    const { control, handleSubmit, formState: { errors }, reset } = useForm<CreateModuleDto>({ defaultValues });

    const onSubmit = (data: CreateModuleDto) => {
        console.log(data);
    }

    return {
        control,
        handleSubmit,
        errors,
        onSubmit
    }
}