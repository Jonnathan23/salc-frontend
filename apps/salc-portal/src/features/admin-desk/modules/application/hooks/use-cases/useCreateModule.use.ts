import { ShowMessageAdapter } from "@/core/adapters/ShowMessage.adapter";
import { createModuleUseCase } from "@salc/core/features/admin-desk/modules/di/ModuleModule";
import { CreateModuleDtoImpl, type CreateModuleDto } from "@salc/core/features/admin-desk/modules/domain/dtos";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { UseFormReset } from "react-hook-form";

interface UseCreateModuleProps {
    reset: UseFormReset<CreateModuleDto>;
}

export const useCreateModule = ({ reset }: UseCreateModuleProps) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateModuleDto) => {
            const validDto = CreateModuleDtoImpl.create(data);

            return await createModuleUseCase.execute(validDto);
        },
        onSuccess: (successResponse) => {
            queryClient.invalidateQueries({ queryKey: ["modules"] });
            reset();
            ShowMessageAdapter.success(successResponse.message);
        }
    })
}