import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useCreateUser, useLoginUser } from "@/features/indentity/application/hooks";
import { useAuthStore } from "@/features/indentity/application/store/auth.store";
import type { LoginUserDto } from "@salc/core/features/shared/indentity/domain/dtos";
import type { UserRoles } from "@salc/core/interfaces";
import type { BaseUserFormValues } from "@/features/indentity/presentation/interfaces";
import { useUpdateUser } from "@/features/indentity/application/hooks/useUpdateUser.use";

interface UseFormUserProps {
    onRoleChange: (role: string) => void;
    onSuccess: () => void;
}

export const useFormUser = ({ onRoleChange, onSuccess }: UseFormUserProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const defaultValues: BaseUserFormValues = { us_full_name: '', us_email: '', us_password_hash: '', us_role: 'TEACHER' as UserRoles };


    const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm<BaseUserFormValues>({ defaultValues, });

    const { mutate, isPending } = useCreateUser({ reset, onSuccess });

    const selectedRole = watch('us_role');

    useEffect(() => { if (selectedRole) { onRoleChange(selectedRole); } }, [selectedRole, onRoleChange]);

    const onSubmit = (data: BaseUserFormValues) => { mutate(data); };
    const handleSetShowPassword = () => { setShowPassword(!showPassword); };

    return {
        register,
        handleSubmit,
        control,
        errors,
        isPending,
        onSubmit,
        showPassword,
        handleSetShowPassword
    }
}


interface UseUpdateFormUserProps {
    onRoleChange: (role: UserRoles) => void;
    defaultValues: BaseUserFormValues;
    id: string;
}

export const useUpdateFormUser = ({ onRoleChange, defaultValues, id }: UseUpdateFormUserProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, control, watch, formState: { errors } } = useForm<BaseUserFormValues>({ defaultValues, });

    const { mutate, isPending } = useUpdateUser();

    const selectedRole = watch('us_role');

    useEffect(() => { if (selectedRole) { onRoleChange(selectedRole as UserRoles); } }, [selectedRole, onRoleChange]);

    const onSubmit = (data: BaseUserFormValues) => { mutate({ id, data }); };
    const handleSetShowPassword = () => { setShowPassword(!showPassword); };

    return {
        register,
        handleSubmit,
        control,
        errors,
        isPending,
        onSubmit,
        showPassword,
        handleSetShowPassword
    }
}



export const useLoginForm = () => {
    const defaultValues: LoginUserDto = { us_email: '', us_password_hash: '', };
    const { register, handleSubmit, formState: { errors } } = useForm<LoginUserDto>({ defaultValues });

    const { setLoginSession } = useAuthStore();

    const { mutate: login, isPending: isPendingLogin } = useLoginUser({ setLoginSession });


    const onSubmit = async (data: LoginUserDto) => {
        login(data);
    };


    return {
        register,
        handleSubmit,
        errors,
        onSubmit,
        isPendingLogin
    }
}