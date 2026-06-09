import { useQuery } from "@tanstack/react-query";
import { getPendingApprovalSessionsUseCase } from "@salc/core/features/class-track-teachers/attendance/di/AttendanceModule";

export const useGetPendingApprovalSessions = () => {
    return useQuery({
        queryKey: ["active-sessions", "pending-approval"],
        queryFn: async () => {
            const response = await getPendingApprovalSessionsUseCase.execute();

            if (!response.data) return [];

            const sessionsList = response.data;

            return sessionsList;
        },
    });
};
