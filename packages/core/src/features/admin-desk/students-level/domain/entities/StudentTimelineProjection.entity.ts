import type { StudentModuleStatus } from "@salc/core/features/admin-desk/students-level/domain/interfaces/StudentLevels.interface";

export interface TimelineStudentInfo {
    readonly id: string;
    readonly fullName: string;
    readonly phoneNumber: string;
    readonly startDate: Date;
}

export interface TimelineEnrolledLevel {
    readonly contractId: string;
    readonly status: StudentModuleStatus;
    readonly purchaseDate: Date;
    readonly module: {
        readonly moduleId: string;
        readonly name: string;
        readonly level: number;
    };
}

export interface TimelineAvailableModule {
    readonly moduleId: string;
    readonly name: string;
    readonly level: number;
    readonly description: string;
}

export class StudentTimelineProjectionEntity {
    constructor(
        public readonly studentInfo: TimelineStudentInfo,
        public readonly enrolledLevels: TimelineEnrolledLevel[],
        public readonly availableModules: TimelineAvailableModule[],
    ) {}
}
