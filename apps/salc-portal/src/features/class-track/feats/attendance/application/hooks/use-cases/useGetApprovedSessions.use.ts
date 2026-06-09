import { useQuery } from "@tanstack/react-query";
import { getApprovedSessionsUseCase } from "@salc/core/features/class-track-teachers/attendance/di/AttendanceModule";

export const useGetApprovedSessions = () => {
    return useQuery({
        queryKey: ["active-sessions", "approved"],
        queryFn: async () => {
            const response = await getApprovedSessionsUseCase.execute();

            if (!response.data) return [];

            const sessionsList = response.data;

            return sessionsList;
        },
    });
};
