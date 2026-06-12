import type { RetentionAlertStatus } from "@salc/core/features/class-track-teachers/retation-alert/domain/interfaces/RetentionAlert.interface";
import type { StudentContractStatus } from "@salc/core/features/admin-desk/students/domain/interfaces";

export interface GetRetentionAlertsDtoProps {
    status?: RetentionAlertStatus;
    page?: number;
    limit?: number;
    studentParameter?: string;
    contractStatus?: StudentContractStatus;
    daysAbsent?: number;
    isJustified?: boolean;
}

export class GetRetentionAlertsDto {
    private constructor(
        public readonly status?: RetentionAlertStatus,
        public readonly page?: number,
        public readonly limit?: number,
        public readonly studentParameter?: string,
        public readonly contractStatus?: StudentContractStatus,
        public readonly daysAbsent?: number,
        public readonly isJustified?: boolean,
    ) {}

    static create(data: GetRetentionAlertsDtoProps): GetRetentionAlertsDto {
        return new GetRetentionAlertsDto(
            data.status,
            data.page,
            data.limit,
            data.studentParameter,
            data.contractStatus,
            data.daysAbsent,
            data.isJustified,
        );
    }
}
