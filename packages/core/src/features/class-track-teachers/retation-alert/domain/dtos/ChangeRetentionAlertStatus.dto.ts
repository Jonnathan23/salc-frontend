import type { RetentionAlertStatus } from "@salc/core/features/class-track-teachers/retation-alert/domain/interfaces/RetentionAlert.interface";
import { CustomError } from "@salc/core/enums";

export interface ChangeRetentionAlertStatusDtoProps {
    status: RetentionAlertStatus;
}

export class ChangeRetentionAlertStatusDto {
    private constructor(public readonly status: RetentionAlertStatus) {}

    static create(data: ChangeRetentionAlertStatusDtoProps): ChangeRetentionAlertStatusDto {
        if (!data.status) {
            throw CustomError.badRequest("Status is required");
        }

        return new ChangeRetentionAlertStatusDto(data.status);
    }
}
