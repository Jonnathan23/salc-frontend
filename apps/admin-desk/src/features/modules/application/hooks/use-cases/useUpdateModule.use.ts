import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import type { UseFormReset } from "react-hook-form";

import { ShowMessageAdapter } from "@/core/adapters/ShowMessage.adapter";
import { updateModuleUseCase } from "@salc/core/features/admin-desk/modules/di/ModuleModule";
import { UpdateModuleDtoImpl, type UpdateModuleDto } from "@salc/core/features/admin-desk/modules/domain/dtos";
import type { ModuleEntity } from "@salc/core/features/admin-desk/modules/domain/entities/Module.entity";


interface UseUpdateModuleProps {
    reset: UseFormReset<UpdateModuleDto>;
    setModuleSelected: Dispatch<SetStateAction<ModuleEntity | null>>
    setIsEditing: Dispatch<SetStateAction<boolean>>
}

interface UseUpdateModuleMutationProps {
    id: string;
    data: UpdateModuleDto;
}

export const useUpdateModule = ({ reset, setModuleSelected, setIsEditing }: UseUpdateModuleProps) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: UseUpdateModuleMutationProps) => {
            const validDto = UpdateModuleDtoImpl.create(data);

            return await updateModuleUseCase.execute(id, validDto);
        },
        onSuccess: (successResponse,) => {
            setModuleSelected(null);
            setIsEditing(false);

            queryClient.invalidateQueries({ queryKey: ["modules"] });
            ShowMessageAdapter.success(successResponse.message);
            reset();
        }
    })
}