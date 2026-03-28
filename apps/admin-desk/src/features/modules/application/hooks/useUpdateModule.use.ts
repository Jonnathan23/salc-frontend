import { ShowMessageAdapter } from "@/core/adapters/ShowMessage.adapter";
import { updateModuleUseCase } from "@salc/core/features/admin-desk/modules/di/ModuleModule";
import { UpdateModuleDtoImpl, type UpdateModuleDto } from "@salc/core/features/admin-desk/modules/domain/dtos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseFormReset } from "react-hook-form";


interface UseUpdateModuleProps {
    reset: UseFormReset<UpdateModuleDto>;
}

interface UseUpdateModuleMutationProps {
    id: string;
    data: UpdateModuleDto;
}

export const useUpdateModule = ({ reset }: UseUpdateModuleProps) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: UseUpdateModuleMutationProps) => {
            const validDto = UpdateModuleDtoImpl.create(data);

            return await updateModuleUseCase.execute(id, validDto);
        },
        onSuccess: (successResponse) => {
            queryClient.invalidateQueries({ queryKey: ["modules"] });
            reset();
            ShowMessageAdapter.success(successResponse.message);
        }
    })
}