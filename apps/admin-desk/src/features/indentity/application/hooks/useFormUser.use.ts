import { useCreateUser, useLoginUser } from "@/features/indentity/application/hooks";
import { useAuthStore } from "@/features/indentity/application/store/auth.store";
import type { LoginUserDto, RegisterUserDto } from "@salc/core/features/shared/indentiy/domain/dtos";
import type { UserRoles } from "@salc/core/interfaces";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface UseFormUserProps {
    onRoleChange: (role: string) => void;
    onSuccess: () => void;
}

export const useFormUser = ({ onRoleChange, onSuccess }: UseFormUserProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const defaultValues: RegisterUserDto = { us_full_name: '', us_email: '', us_password_hash: '', us_role: 'TEACHER' as UserRoles };


    const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm<RegisterUserDto>({ defaultValues, });

    const { mutate, isPending } = useCreateUser({ reset, onSuccess });

    const selectedRole = watch('us_role');

    useEffect(() => { if (selectedRole) { onRoleChange(selectedRole); } }, [selectedRole, onRoleChange]);

    const onSubmit = (data: RegisterUserDto) => { mutate(data); };
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
        login(data); };


    return {
        register,
        handleSubmit,
        errors,
        onSubmit,
        isPendingLogin
    }
}