import { useQuery } from "@tanstack/react-query";
import { getDashboardSummaryUseCase } from "@salc/core/features/class-track-teachers/dashboard/di/DashboardModule";
import type { DashboardSummaryEntity } from "@salc/core/features/class-track-teachers/dashboard/domain/entities/DashboardSummary.entity";

export const useGetDashboardSummary = () => {
    return useQuery<DashboardSummaryEntity>({
        queryKey: ["class-track", "dashboard-summary"],
        queryFn: async () => {
            const response = await getDashboardSummaryUseCase.execute();

            if (!response.data) throw new Error("No data returned from dashboard summary use case");
            const dashboardSummaryEntity = response.data;

            return dashboardSummaryEntity;
        },
    });
};
