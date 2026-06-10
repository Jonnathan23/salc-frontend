import { useMutation, useQueryClient } from "@tanstack/react-query";
import { purchaseModulesUseCase } from "@salc/core/features/admin-desk/students-level/di/StudentLevelModule";

import { ShowMessageAdapter } from "@/core/adapters/ShowMessage.adapter";
import type { BaseStudentLevelFormValues } from "@/features/admin-desk/students-levels/presentation/interfaces/BaseStudentLevelFormValues.interface";
import { StudentLevelFormMapper } from "@/features/admin-desk/students-levels/presentation/mappers/StudentLevelFormMapper";

interface UsePurchaseModulesProps {
    handleSuccess: () => void;
}

export const usePurchaseModules = ({ handleSuccess }: UsePurchaseModulesProps) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: BaseStudentLevelFormValues) => {
            const validDataTransferObject = StudentLevelFormMapper.toPurchaseDto(formData);

            return await purchaseModulesUseCase.execute(validDataTransferObject);
        },
        onSuccess: (successResponse) => {
            const data = successResponse.data;

            if (!data) return;

            const entity = data[0];

            queryClient.invalidateQueries({ queryKey: ["students-levels", "timeline", entity.studentId] });
            queryClient.invalidateQueries({ queryKey: ["students-levels", "search"] });
            ShowMessageAdapter.success(successResponse.message || "Módulos comprados exitosamente");
            handleSuccess();
        },
    });
};
