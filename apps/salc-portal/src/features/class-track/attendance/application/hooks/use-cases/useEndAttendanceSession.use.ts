import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseFormReset } from "react-hook-form";
import { ShowMessageAdapter } from "@/core/adapters/ShowMessage.adapter";
import { endAttendanceSessionUseCase } from "@salc/core/features/class-track-teachers/attendance/di/AttendanceModule";
import type { BaseEndSessionFormValues } from "@/features/class-track/attendance/presentation/interfaces/BaseEndSessionFormValues.interface";
import { EndSessionFormMapper } from "@/features/class-track/attendance/presentation/mappers/endSessionForm.mapper";

interface UseEndAttendanceSessionProps {
    reset: UseFormReset<BaseEndSessionFormValues>;
}

export const useEndAttendanceSession = ({ reset }: UseEndAttendanceSessionProps) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: BaseEndSessionFormValues) => {
            const validDataTransferObject = EndSessionFormMapper.toEndSessionDto(formData);

            return await endAttendanceSessionUseCase.execute(validDataTransferObject);
        },
        onSuccess: (successResponse) => {
            queryClient.invalidateQueries({ queryKey: ["active-sessions"] });
            reset();
            ShowMessageAdapter.success(successResponse.message);
        },
    });
};
