export interface StudentInClassViewModel {
    sessionId: string;
    studentId: string;
    fullName: string;

    entryTime: string;
}

export interface DashboardSummaryViewModel {
    studentsInsideCount: number;
    pendingCheckoutsCount: number;
    activeAlertsCount: number;
    activeContractsCount: number;
    studentsInClass: StudentInClassViewModel[];
}
