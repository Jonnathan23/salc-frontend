import { RetentionAlertDataSource } from "@salc/core/features/class-track-teachers/retation-alert/domain/datasources/retentionAlert.datasource";
import { RetentionAlertRepository } from "@salc/core/features/class-track-teachers/retation-alert/domain/repositories/retentionAlert.repository";
import type { UpdateRetentionAlertDto } from "@salc/core/features/class-track-teachers/retation-alert/domain/dtos/UpdateRetentionAlert.dto";
import type { GetRetentionAlertsDto } from "@salc/core/features/class-track-teachers/retation-alert/domain/dtos/GetRetentionAlerts.dto";
import type { ChangeRetentionAlertStatusDto } from "@salc/core/features/class-track-teachers/retation-alert/domain/dtos/ChangeRetentionAlertStatus.dto";
import type { RetentionAlertEntity } from "@salc/core/features/class-track-teachers/retation-alert/domain/entities/RetentionAlert.entity";
import type { RetentionAlertWithStudentProjection } from "@salc/core/features/class-track-teachers/retation-alert/domain/projections/RetentionAlertWithStudent.projection";
import type { SuccessResponse, PaginatedResult } from "@salc/core/interfaces";

export class RetentionAlertRepositoryImpl implements RetentionAlertRepository {
    constructor(private readonly dataSource: RetentionAlertDataSource) {}

    async getAlerts(dto: GetRetentionAlertsDto): Promise<SuccessResponse<PaginatedResult<RetentionAlertWithStudentProjection>>> {
        return this.dataSource.getAlerts(dto);
    }

    async updateAlertInfo(id: string, dto: UpdateRetentionAlertDto): Promise<SuccessResponse<RetentionAlertEntity>> {
        return this.dataSource.updateAlertInfo(id, dto);
    }

    async changeAlertStatus(id: string, dto: ChangeRetentionAlertStatusDto): Promise<SuccessResponse<RetentionAlertEntity>> {
        return this.dataSource.changeAlertStatus(id, dto);
    }
}
