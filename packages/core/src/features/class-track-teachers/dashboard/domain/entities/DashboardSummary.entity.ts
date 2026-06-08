import type { StudentInClassDashboardEntity } from "@salc/core/features/class-track-teachers/dashboard/domain/entities/StudentInClass.entity";

export class DashboardSummaryEntity {
    constructor(
        public readonly studentsInsideCount: number,
        public readonly pendingCheckoutsCount: number,
        public readonly activeAlertsCount: number,
        public readonly activeContractsCount: number,
        public readonly studentsInClass: StudentInClassDashboardEntity[],
    ) {}
}
