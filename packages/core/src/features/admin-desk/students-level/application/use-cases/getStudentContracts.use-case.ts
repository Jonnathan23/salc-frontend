import type { StudentLevelDetailsEntity } from "@salc/core/features/admin-desk/students-level/domain/entities";
import type { StudentLevelRepository } from "@salc/core/features/admin-desk/students-level/domain/repositories/student-level.repository";

import type { SuccessResponse } from "@salc/core/interfaces";

export interface GetStudentContractsUseCase {
    execute(studentId: string): Promise<SuccessResponse<StudentLevelDetailsEntity[]>>;
}

export class GetStudentContractsUseCaseImpl implements GetStudentContractsUseCase {
    constructor(private readonly studentLevelRepository: StudentLevelRepository) {}

    async execute(studentId: string): Promise<SuccessResponse<StudentLevelDetailsEntity[]>> {
        return this.studentLevelRepository.getStudentContracts(studentId);
    }
}
