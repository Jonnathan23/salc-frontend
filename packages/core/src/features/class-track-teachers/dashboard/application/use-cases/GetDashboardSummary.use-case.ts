import type { DashboardRepository } from "@salc/core/features/class-track-teachers/dashboard/domain/repositories/Dashboard.repository";
import type { DashboardSummaryEntity } from "@salc/core/features/class-track-teachers/dashboard/domain/entities/DashboardSummary.entity";
import type { SuccessResponse } from "@salc/core/interfaces";

export class GetDashboardSummaryUseCase {
    constructor(private readonly dashboardRepository: DashboardRepository) {}

    async execute(): Promise<SuccessResponse<DashboardSummaryEntity>> {
        return this.dashboardRepository.getSummary();
    }
}
