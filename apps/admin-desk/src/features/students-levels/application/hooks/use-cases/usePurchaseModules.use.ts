import { useMutation, useQueryClient } from "@tanstack/react-query";
import { purchaseModulesUseCase } from "@salc/core/features/admin-desk/students-level/di/StudentLevelModule";
import { StudentLevelFormMapper } from "../../../presentation/mappers/StudentLevelFormMapper";
import type { BaseStudentLevelFormValues } from "../../../presentation/interfaces/BaseStudentLevelFormValues.interface";
import { ShowMessageAdapter } from "@/core/adapters/ShowMessage.adapter";

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
            queryClient.invalidateQueries({ queryKey: ["get-all-student-levels"] });
            ShowMessageAdapter.success(successResponse.message || "Módulos comprados exitosamente");
            handleSuccess();
        }
    });
};
