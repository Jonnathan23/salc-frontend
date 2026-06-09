import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ShowMessageAdapter } from "@/core/adapters/ShowMessage.adapter";
import { endAttendanceSessionUseCase } from "@salc/core/features/class-track-teachers/attendance/di/AttendanceModule";
import type { BaseEndSessionFormValues } from "@/features/class-track/feats/attendance/presentation/interfaces/BaseEndSessionFormValues.interface";
import { EndSessionFormMapper } from "@/features/class-track/feats/attendance/presentation/mappers/endSessionForm.mapper";

export const useEndAttendanceSession = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: BaseEndSessionFormValues) => {
            const validDataTransferObject = EndSessionFormMapper.toEndSessionDto(formData);

            return await endAttendanceSessionUseCase.execute(validDataTransferObject);
        },
        onSuccess: (successResponse) => {
            queryClient.invalidateQueries({ queryKey: ["active-sessions"] });

            ShowMessageAdapter.success(successResponse.message);
        },
    });
};
