import { ShowMessageAdapter } from "@/core/adapters/ShowMessage.adapter";
import type { BaseUserFormValues } from "@/features/shared/identity/presentation/interfaces/BaseFormValues.interface";
import { UserMapper } from "@/features/shared/identity/presentation/mappers/user.mapper";
import { updateUserUseCase } from "@salc/core/features/shared/identity/di/IdentityModule";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UseUpdateUserMutationProps {
    id: string;
    data: BaseUserFormValues;
}

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: UseUpdateUserMutationProps) => {
            const validDto = UserMapper.toUpdateDto(data);

            return await updateUserUseCase.execute(id, validDto);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            ShowMessageAdapter.success("Usuario actualizado correctamente");
        },
    });
};
