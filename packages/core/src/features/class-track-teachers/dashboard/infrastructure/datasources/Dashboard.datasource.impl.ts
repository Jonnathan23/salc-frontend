import type { DashboardDataSource } from "@salc/core/features/class-track-teachers/dashboard/domain/datasources/Dashboard.datasource";
import type { DashboardSummaryEntity } from "@salc/core/features/class-track-teachers/dashboard/domain/entities/DashboardSummary.entity";
import type { DashboardSummaryMapper } from "@salc/core/features/class-track-teachers/dashboard/infrastructure/mappers/dashboardSummary.mapper";
import { CustomError } from "@salc/core/enums";
import type { MethodsHttp, SuccessResponse } from "@salc/core/interfaces";

export class DashboardDataSourceImpl implements DashboardDataSource {
    private readonly baseUrl = "/dashboard/summary";

    constructor(
        private readonly api: MethodsHttp,
        private readonly dashboardSummaryMapper: DashboardSummaryMapper,
    ) {}

    public async getSummary(): Promise<SuccessResponse<DashboardSummaryEntity>> {
        const rawResponse = await this.api.get<SuccessResponse>(this.baseUrl);

        if (!rawResponse) throw CustomError.internalServer();

        const dashBoardEntity = this.dashboardSummaryMapper.toEntity(rawResponse.data);

        return {
            ...rawResponse,
            data: dashBoardEntity,
        };
    }
}
