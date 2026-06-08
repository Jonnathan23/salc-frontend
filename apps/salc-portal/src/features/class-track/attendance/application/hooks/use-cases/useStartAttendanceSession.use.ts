import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseFormReset } from "react-hook-form";
import { ShowMessageAdapter } from "@/core/adapters/ShowMessage.adapter";
import { startAttendanceSessionUseCase } from "@salc/core/features/class-track-teachers/attendance/di/AttendanceModule";
import type { BaseStartSessionFormValues } from "@/features/class-track/attendance/presentation/interfaces/BaseStartSessionFormValues.interface";
import { StartSessionFormMapper } from "@/features/class-track/attendance/presentation/mappers/startSessionForm.mapper";

interface UseStartAttendanceSessionProps {
    reset: UseFormReset<BaseStartSessionFormValues>;
}

export const useStartAttendanceSession = ({ reset }: UseStartAttendanceSessionProps) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: BaseStartSessionFormValues) => {
            const validDataTransferObject = StartSessionFormMapper.toStartSessionDto(formData);

            return await startAttendanceSessionUseCase.execute(validDataTransferObject);
        },
        onSuccess: (successResponse) => {
            queryClient.invalidateQueries({ queryKey: ["active-sessions"] });
            reset();
            ShowMessageAdapter.success(successResponse.message);
        },
    });
};
