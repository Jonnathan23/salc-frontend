import type { RetentionAlertRepository } from "@salc/core/features/class-track-teachers/retation-alert/domain/repositories/retentionAlert.repository";
import type { GetRetentionAlertsDto } from "@salc/core/features/class-track-teachers/retation-alert/domain/dtos/GetRetentionAlerts.dto";
import type { RetentionAlertWithStudentProjection } from "@salc/core/features/class-track-teachers/retation-alert/domain/projections/RetentionAlertWithStudent.projection";
import type { SuccessResponse } from "@salc/core/interfaces";

export class GetRetentionAlertsUseCase {
    constructor(private readonly retentionAlertRepository: RetentionAlertRepository) {}

    async execute(dto: GetRetentionAlertsDto): Promise<SuccessResponse<RetentionAlertWithStudentProjection[]>> {
        return await this.retentionAlertRepository.getAlerts(dto);
    }
}
