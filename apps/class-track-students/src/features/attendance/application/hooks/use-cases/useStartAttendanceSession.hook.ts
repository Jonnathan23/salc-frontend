import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ShowMessageAdapter } from "@/core/adapters/ShowMessage.adapter";
import { startAttendanceSessionUseCase } from "@salc/core/features/class-track-teachers/attendance/di/AttendanceModule";
import type { BaseCheckInFormValues } from "@/features/attendance/presentation/interfaces/BaseAttendanceFormValues.interface";
import { AttendanceFormMapper } from "@/features/attendance/presentation/mappers/attendanceForm.mapper";

interface UseStartAttendanceSessionProps {
    onSuccessCallback?: () => void;
}

export const useStartAttendanceSession = ({ onSuccessCallback }: UseStartAttendanceSessionProps) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: BaseCheckInFormValues) => {
            const validDataTransferObject = AttendanceFormMapper.toStartSessionDto(formData);

            return await startAttendanceSessionUseCase.execute(validDataTransferObject);
        },
        onSuccess: (successResponse) => {
            queryClient.invalidateQueries({ queryKey: ["attendance-sessions"] });
            if (onSuccessCallback) onSuccessCallback();
            ShowMessageAdapter.success(successResponse.message);
        },
    });
};
