import type { DashboardRepository } from "@salc/core/features/class-track-teachers/dashboard/domain/repositories/dashboard.repository";
import type { DashboardDataSource } from "@salc/core/features/class-track-teachers/dashboard/domain/datasources/dashboard.datasource";
import type { DashboardSummaryEntity } from "@salc/core/features/class-track-teachers/dashboard/domain/entities/DashboardSummary.entity";
import type { SuccessResponse } from "@salc/core/interfaces";

export class DashboardRepositoryImpl implements DashboardRepository {
    constructor(private readonly dataSource: DashboardDataSource) {}

    async getSummary(): Promise<SuccessResponse<DashboardSummaryEntity>> {
        return this.dataSource.getSummary();
    }
}
