import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStudentLevelUseCase } from "@salc/core/features/admin-desk/students-level/di/StudentLevelModule";
import { StudentLevelFormMapper } from "../../../presentation/mappers/StudentLevelFormMapper";
import type { BaseStudentLevelFormValues } from "../../../presentation/interfaces/BaseStudentLevelFormValues.interface";
import { ShowMessageAdapter } from "@/core/adapters/ShowMessage.adapter";

interface UseUpdateStudentLevelProps {
    handleSuccess: () => void;
}

export const useUpdateStudentLevel = ({ handleSuccess }: UseUpdateStudentLevelProps) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: BaseStudentLevelFormValues) => {
            const validDataTransferObject = StudentLevelFormMapper.toUpdateDto(formData);

            return await updateStudentLevelUseCase.execute(validDataTransferObject);
        },
        onSuccess: (successResponse) => {
            queryClient.invalidateQueries({ queryKey: ["student-contracts"] });
            ShowMessageAdapter.success(successResponse.message || "Nivel actualizado exitosamente");
            handleSuccess();
        }
    });
};
