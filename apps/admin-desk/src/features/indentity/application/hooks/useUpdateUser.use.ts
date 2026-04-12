import { ShowMessageAdapter } from "@/core/adapters/ShowMessage.adapter";
import { updateUserUseCase } from "@salc/core/features/shared/indentiy/di/IdentityModule";
import { UpdateUserDtoImpl, type UpdateUserDto } from "@salc/core/features/shared/indentiy/domain/dtos";
import { useMutation, useQueryClient } from "@tanstack/react-query";



interface UseUpdateUserMutationProps {
    id: string;
    data: UpdateUserDto;
}

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: UseUpdateUserMutationProps) => {
            const validDto = UpdateUserDtoImpl.create(data);

            return await updateUserUseCase.execute(id, validDto);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            ShowMessageAdapter.success('Usuario actualizado correctamente');
        },
    })
}