import type { SuccessResponse } from "@salc/core/interfaces";
import type { DashboardSummaryEntity } from "@salc/core/features/class-track-teachers/dashboard/domain/entities/DashboardSummary.entity";

export abstract class DashboardRepository {
    abstract getSummary(): Promise<SuccessResponse<DashboardSummaryEntity>>;
}
