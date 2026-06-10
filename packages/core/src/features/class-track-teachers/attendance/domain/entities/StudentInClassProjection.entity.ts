import type { AttendanceSessionStatus } from "@salc/core/features/class-track-teachers/attendance/domain/interfaces/AttendanceSessionStatus.interface";

export class StudentInClassProjection {
    constructor(
        public readonly sessionId: string,
        public readonly studentId: string,
        public readonly fullName: string,
        public readonly sessionStatus: AttendanceSessionStatus,
        public readonly entryTime: Date,
    ) {}
}
