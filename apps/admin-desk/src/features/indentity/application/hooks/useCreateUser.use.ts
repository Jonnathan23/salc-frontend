import { useMutation, useQueryClient } from '@tanstack/react-query';

import { RegisterUserDtoImpl, type RegisterUserDto } from '@salc/core/features/shared/indentiy/domain/dtos';
import { createUserUseCase } from '@salc/core/features/shared/indentiy/di/IdentityModule';
import type { CustomError } from '@salc/core/enums';
import type { UseFormReset } from 'react-hook-form';

interface UseCreateUserProps {
    reset: UseFormReset<RegisterUserDto>
    onSuccess: () => void;
}

export const useCreateUser = ({ reset, onSuccess }: UseCreateUserProps) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (rawData: RegisterUserDto) => {
            const validDto = RegisterUserDtoImpl.create(rawData);

            return await createUserUseCase.execute(validDto);
        },
        onSuccess: (successResponse) => {
            console.log("Éxito:", successResponse.message);
            queryClient.invalidateQueries({ queryKey: ["users"] });            
            onSuccess();
            setTimeout(() => reset(), 3000);
        },
        onError: (error: CustomError) => {
            console.error("Error:", error.errors[0]?.message);
        },
    });
};