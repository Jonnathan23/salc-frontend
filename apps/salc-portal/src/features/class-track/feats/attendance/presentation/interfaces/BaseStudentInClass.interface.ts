import type { AttendanceSessionStatus } from "@salc/core/features/class-track-teachers/attendance/domain/interfaces/AttendanceSessionStatus.interface";

export interface BaseStudentInClass {
    sessionId: string;
    studentId: string;
    fullName: string;
    sessionStatus: AttendanceSessionStatus;
    entryTime: string;
}
