import { useQuery } from "@tanstack/react-query";
import { getInProgressSessionsUseCase } from "@salc/core/features/class-track-teachers/attendance/di/AttendanceModule";

export const useGetInProgressSessions = () => {
    return useQuery({
        queryKey: ["active-sessions", "in-progress"],
        queryFn: async () => {
            const response = await getInProgressSessionsUseCase.execute();

            if (!response.data) return [];

            const sessionsList = response.data;

            return sessionsList;
        },
    });
};
