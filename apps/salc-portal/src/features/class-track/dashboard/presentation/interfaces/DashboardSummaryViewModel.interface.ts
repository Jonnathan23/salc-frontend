import type { StudentContractStatus } from "@salc/core/features/admin-desk/students/domain/interfaces";

export interface StudentInClassViewModel {
    sessionId: string;
    studentId: string;
    fullName: string;
    contractStatus: StudentContractStatus;
    entryTime: string;
}

export interface DashboardSummaryViewModel {
    studentsInsideCount: number;
    pendingCheckoutsCount: number;
    activeAlertsCount: number;
    activeContractsCount: number;
    studentsInClass: StudentInClassViewModel[];
}
