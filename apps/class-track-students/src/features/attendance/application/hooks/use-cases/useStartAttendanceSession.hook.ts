import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ShowMessageAdapter } from "@/core/adapters/ShowMessage.adapter";
import { startAttendanceSessionUseCase } from "@salc/core/features/class-track-teachers/attendance/di/AttendanceModule";
import type { BaseCheckInFormValues } from "@/features/attendance/presentation/interfaces/BaseAttendanceFormValues.interface";
import { AttendanceFormMapper } from "@/features/attendance/presentation/mappers/attendanceForm.mapper";

interface UseStartAttendanceSessionProps {
    onSuccessCallback?: () => void;
    setEntryTime: (time: string) => void;
}

export const useStartAttendanceSession = ({ onSuccessCallback, setEntryTime }: UseStartAttendanceSessionProps) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: BaseCheckInFormValues) => {
            const validDataTransferObject = AttendanceFormMapper.toStartSessionDto(formData);

            return await startAttendanceSessionUseCase.execute(validDataTransferObject);
        },
        onSuccess: (successResponse) => {
            const entryTime = successResponse.data?.atSeEntryTime;

            if (entryTime) {
                setEntryTime(entryTime.toString());
            }

            queryClient.invalidateQueries({ queryKey: ["attendance-sessions"] });
            if (onSuccessCallback) onSuccessCallback();
            ShowMessageAdapter.success(successResponse.message);
        },
    });
};
