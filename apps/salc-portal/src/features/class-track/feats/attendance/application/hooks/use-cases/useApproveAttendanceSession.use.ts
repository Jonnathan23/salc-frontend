import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ShowMessageAdapter } from "@/core/adapters/ShowMessage.adapter";
import { approveAttendanceSessionUseCase } from "@salc/core/features/class-track-teachers/attendance/di/AttendanceModule";
import type { BaseApproveSessionFormValues } from "@/features/class-track/feats/attendance/presentation/interfaces/BaseApproveSessionFormValues.interface";
import { ApproveSessionFormMapper } from "@/features/class-track/feats/attendance/presentation/mappers/approveSessionForm.mapper";

export const useApproveAttendanceSession = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: BaseApproveSessionFormValues) => {
            const validDataTransferObject = ApproveSessionFormMapper.toApproveSessionDto(formData);

            return await approveAttendanceSessionUseCase.execute(validDataTransferObject);
        },
        onSuccess: (successResponse) => {
            queryClient.invalidateQueries({ queryKey: ["active-sessions"] });
            queryClient.invalidateQueries({ queryKey: ["pending-approvals"] });

            ShowMessageAdapter.success(successResponse.message);
        },
    });
};
