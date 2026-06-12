import type { RetentionAlertStatus } from "@salc/core/features/class-track-teachers/retation-alert/domain/interfaces/RetentionAlert.interface";

export class BasicStudentInfo {
    constructor(
        public readonly id: string,
        public readonly fullName: string,
        public readonly identificationCard: string,
        public readonly phoneNumber: string,
        public readonly contractStatus: string,
    ) {}
}

export class RetentionAlertWithStudentProjection {
    constructor(
        public readonly id: string,
        public readonly contactDate: Date | null,
        public readonly hasResponded: boolean,
        public readonly daysAbsent: number,
        public readonly isJustified: boolean,
        public readonly justificationReason: string | null,
        public readonly returnDeadline: Date | null,
        public readonly observations: string,
        public readonly status: RetentionAlertStatus,
        public readonly student: BasicStudentInfo,
        public readonly createdAt: Date,
    ) {}
}
