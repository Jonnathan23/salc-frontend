import type { StudentContractStatus } from "@salc/core/features/admin-desk/students/domain/interfaces/Student.interface";

export interface BaseStudentInClass {
    sessionId: string;
    studentId: string;
    fullName: string;
    contractStatus: StudentContractStatus;
    entryTime: Date;
}
