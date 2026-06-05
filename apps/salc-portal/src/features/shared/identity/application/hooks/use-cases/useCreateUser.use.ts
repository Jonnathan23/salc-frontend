import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UseFormReset } from 'react-hook-form';

import { createUserUseCase } from '@salc/core/features/shared/identity/di/IdentityModule';
import { ShowMessageAdapter } from '@/core/adapters/ShowMessage.adapter';
import type { BaseUserFormValues } from '@/features/shared/identity/presentation/interfaces/BaseFormValues.interface';
import { UserMapper } from '@/features/shared/identity/presentation/mappers/user.mapper';

interface UseCreateUserProps {
    reset: UseFormReset<BaseUserFormValues>
    onSuccess: () => void;
}

export const useCreateUser = ({ reset, onSuccess }: UseCreateUserProps) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (rawData: BaseUserFormValues) => {
            const validDto = UserMapper.toRegisterDto(rawData);

            return await createUserUseCase.execute(validDto);
        },
        onSuccess: (successResponse) => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            onSuccess();
            reset();
            ShowMessageAdapter.success(successResponse.message);
        }
    });
};