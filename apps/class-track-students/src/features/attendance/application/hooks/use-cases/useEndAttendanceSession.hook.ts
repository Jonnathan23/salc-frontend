import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ShowMessageAdapter } from "@/core/adapters/ShowMessage.adapter";
import { endAttendanceSessionUseCase } from "@salc/core/features/class-track-teachers/attendance/di/AttendanceModule";
import { AttendanceFormMapper } from "../../../presentation/mappers/attendanceForm.mapper";
import type { BaseCheckoutFormValues } from "../../../presentation/interfaces/BaseAttendanceFormValues.interface";

interface UseEndAttendanceSessionProps {
    onSuccessCallback?: () => void;
}

export const useEndAttendanceSession = ({ onSuccessCallback }: UseEndAttendanceSessionProps = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: BaseCheckoutFormValues) => {
            const validDataTransferObject = AttendanceFormMapper.toEndSessionDto(formData);

            return await endAttendanceSessionUseCase.execute(validDataTransferObject);
        },
        onSuccess: (successResponse) => {
            queryClient.invalidateQueries({ queryKey: ["attendance-sessions"] });
            if (onSuccessCallback) onSuccessCallback();
            ShowMessageAdapter.success(successResponse.message);
        },
    });
};
