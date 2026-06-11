import type { RetentionAlertStatus } from "@salc/core/features/class-track-teachers/retation-alert/domain/interfaces/RetentionAlert.interface";

export interface GetRetentionAlertsDtoProps {
    status?: RetentionAlertStatus;
    page?: number;
    limit?: number;
}

export class GetRetentionAlertsDto {
    private constructor(
        public readonly status?: RetentionAlertStatus,
        public readonly page?: number,
        public readonly limit?: number,
    ) {}

    static create(data: GetRetentionAlertsDtoProps): GetRetentionAlertsDto {
        return new GetRetentionAlertsDto(data.status, data.page, data.limit);
    }
}
