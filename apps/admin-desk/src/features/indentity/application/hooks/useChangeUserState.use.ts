import { ShowMessageAdapter } from "@/core/adapters/ShowMessage.adapter";
import { changeUserStateUseCase } from "@salc/core/features/shared/indentiy/di/IdentityModule";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useChangeUserState = () =>  {
    
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id: string) => {
            return changeUserStateUseCase.execute(id);
        },
        onSuccess: (data) => {            
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: ['user-by-id'] });
            ShowMessageAdapter.success(data.message)
        },
    });

    return mutation;
}