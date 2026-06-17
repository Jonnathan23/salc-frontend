import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ShowMessageAdapter } from "@/core/adapters/ShowMessage.adapter";
import { createLessonLogsUseCase } from "@salc/core/features/class-track-teachers/lesson-logs/di/LessonLogModule";
import { LessonLogsFormMapper } from "../../../presentation/mappers/lessonLogsForm.mapper";
import type { BaseLessonLogsFormValues } from "../../../presentation/interfaces/BaseLessonLogsFormValues.interface";

interface UseCreateLessonLogsProps {
    onSuccessCallback?: () => void;
}

export const useCreateLessonLogs = ({ onSuccessCallback }: UseCreateLessonLogsProps = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: BaseLessonLogsFormValues) => {
            const validDataTransferObject = LessonLogsFormMapper.toCreateDto(formData);

            return await createLessonLogsUseCase.execute(validDataTransferObject);
        },
        onSuccess: (successResponse) => {
            queryClient.invalidateQueries({ queryKey: ["lesson-logs"] });
            if (onSuccessCallback) {
                onSuccessCallback();
            }
            ShowMessageAdapter.success(successResponse.message);
        },
    });
};
