import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStudentLevelUseCase } from "@salc/core/features/admin-desk/students-level/di/StudentLevelModule";
import { DeleteStudentLevelDtoImpl } from "@salc/core/features/admin-desk/students-level/domain/dtos/DeleteStudentLevel.dto";
import { ShowMessageAdapter } from "@/core/adapters/ShowMessage.adapter";

interface UseDeleteStudentLevelProps {
    handleSuccess?: () => void;
}

export const useDeleteStudentLevel = ({ handleSuccess }: UseDeleteStudentLevelProps = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (studentLevelId: string) => {
            // Utilizamos el DTO directamente ya que no viene de un formulario complejo
            const validDto = DeleteStudentLevelDtoImpl.create({ studentLevelId });
            return await deleteStudentLevelUseCase.execute(validDto.studentLevelId);
        },
        onSuccess: (successResponse) => {
            queryClient.invalidateQueries({ queryKey: ["student-contracts"] });
            ShowMessageAdapter.success(successResponse.message || "Nivel eliminado exitosamente");
            if (handleSuccess) handleSuccess();
        }
    });
};
