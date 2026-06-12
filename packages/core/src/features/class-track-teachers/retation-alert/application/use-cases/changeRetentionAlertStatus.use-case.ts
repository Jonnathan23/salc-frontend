import type { RetentionAlertRepository } from "@salc/core/features/class-track-teachers/retation-alert/domain/repositories/retentionAlert.repository";
import type { RetentionAlertEntity } from "@salc/core/features/class-track-teachers/retation-alert/domain/entities/RetentionAlert.entity";
import type { ChangeRetentionAlertStatusDto } from "@salc/core/features/class-track-teachers/retation-alert/domain/dtos/ChangeRetentionAlertStatus.dto";
import type { SuccessResponse } from "@salc/core/interfaces";

export class ChangeRetentionAlertStatusUseCase {
    constructor(private readonly retentionAlertRepository: RetentionAlertRepository) {}

    async execute(id: string, dto: ChangeRetentionAlertStatusDto): Promise<SuccessResponse<RetentionAlertEntity>> {
        return await this.retentionAlertRepository.changeAlertStatus(id, dto);
    }
}
