import type { UpdateRetentionAlertDto } from "@salc/core/features/class-track-teachers/retation-alert/domain/dtos/UpdateRetentionAlert.dto";
import type { GetRetentionAlertsDto } from "@salc/core/features/class-track-teachers/retation-alert/domain/dtos/GetRetentionAlerts.dto";
import type { ChangeRetentionAlertStatusDto } from "@salc/core/features/class-track-teachers/retation-alert/domain/dtos/ChangeRetentionAlertStatus.dto";
import type { RetentionAlertEntity } from "@salc/core/features/class-track-teachers/retation-alert/domain/entities/RetentionAlert.entity";
import type { RetentionAlertWithStudentProjection } from "@salc/core/features/class-track-teachers/retation-alert/domain/projections/RetentionAlertWithStudent.projection";
import type { SuccessResponse, PaginatedResult } from "@salc/core/interfaces";

export abstract class RetentionAlertDataSource {
    abstract getAlerts(
        dto: GetRetentionAlertsDto,
    ): Promise<SuccessResponse<PaginatedResult<RetentionAlertWithStudentProjection>>>;
    abstract updateAlertInfo(id: string, dto: UpdateRetentionAlertDto): Promise<SuccessResponse<RetentionAlertEntity>>;
    abstract changeAlertStatus(id: string, dto: ChangeRetentionAlertStatusDto): Promise<SuccessResponse<RetentionAlertEntity>>;
}
