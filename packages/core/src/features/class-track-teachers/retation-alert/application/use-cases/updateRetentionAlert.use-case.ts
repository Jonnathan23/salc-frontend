import type { RetentionAlertRepository } from "@salc/core/features/class-track-teachers/retation-alert/domain/repositories/retentionAlert.repository";
import type { RetentionAlertEntity } from "@salc/core/features/class-track-teachers/retation-alert/domain/entities/RetentionAlert.entity";
import type { UpdateRetentionAlertDto } from "@salc/core/features/class-track-teachers/retation-alert/domain/dtos/UpdateRetentionAlert.dto";
import type { SuccessResponse } from "@salc/core/interfaces";

export class UpdateRetentionAlertUseCase {
    constructor(private readonly retentionAlertRepository: RetentionAlertRepository) {}

    async execute(id: string, dto: UpdateRetentionAlertDto): Promise<SuccessResponse<RetentionAlertEntity>> {
        return await this.retentionAlertRepository.updateAlertInfo(id, dto);
    }
}
