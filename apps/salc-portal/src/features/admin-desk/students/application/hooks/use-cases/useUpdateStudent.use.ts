import { ShowMessageAdapter } from "@/core/adapters/ShowMessage.adapter";
import type { BaseStudentFormValues } from "@/features/admin-desk/students/presentation/interfaces";
import { StudentFormMapper } from "@/features/admin-desk/students/presentation/mappers/StudentForm.mapper";
import { updateStudentUseCase } from "@salc/core/features/admin-desk/students/di/StudentModule";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UseUpdateStudentMutationProps {
    id: string;
    data: BaseStudentFormValues;
}

interface UseUpdateStudentProps {
    handleSuccess: () => void;
}

export const useUpdateStudent = ({ handleSuccess }: UseUpdateStudentProps) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: UseUpdateStudentMutationProps) => {
            const validDto = StudentFormMapper.toUpdateDto(data);

            return await updateStudentUseCase.execute(id, validDto);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["students"] });
            queryClient.invalidateQueries({ queryKey: ["Searchstudent"] });
            handleSuccess();
            ShowMessageAdapter.success("Estudiante actualizado correctamente");
        },
    });
};
