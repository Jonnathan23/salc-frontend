import type { StudentContractStatus } from "@salc/core/features/admin-desk/students/domain/interfaces";

export class StudentInClassEntity {
    constructor(
        public readonly sessionId: string,
        public readonly studentId: string,
        public readonly fullName: string,
        public readonly contractStatus: StudentContractStatus,
        public readonly entryTime: Date,
    ) {}
}
