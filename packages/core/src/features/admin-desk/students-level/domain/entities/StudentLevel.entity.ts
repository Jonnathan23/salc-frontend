import type { StudentModuleStatus } from "@salc/core/features/admin-desk/students-level/domain/interfaces/StudentLevels.interface";

export class StudentLevelEntity {
    constructor(
        public readonly id: string,
        public readonly studentId: string,
        public readonly moduleId: string,
        public readonly sellerId: string,
        public readonly status: StudentModuleStatus,
        public readonly purchaseDate: Date,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) { }
}
