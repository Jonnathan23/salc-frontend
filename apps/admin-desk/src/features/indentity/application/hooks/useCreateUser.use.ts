import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UseFormReset } from 'react-hook-form';

import { RegisterUserDtoImpl, type RegisterUserDto } from '@salc/core/features/shared/indentity/domain/dtos';
import { createUserUseCase } from '@salc/core/features/shared/indentity/di/IdentityModule';
import { ShowMessageAdapter } from '@/core/adapters/ShowMessage.adapter';

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
            queryClient.invalidateQueries({ queryKey: ["users"] });
            onSuccess();
            setTimeout(() => reset(), 3000);
            ShowMessageAdapter.success(successResponse.message);
        }
    });
};