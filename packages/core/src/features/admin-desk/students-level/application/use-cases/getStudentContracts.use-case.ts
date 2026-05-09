import type { StudentLevelRepository } from "@salc/core/features/admin-desk/students-level/domain/repositories/student-level.repository";
import type { StudentLevelEntity } from "@salc/core/features/admin-desk/students-level/domain/entities/StudentLevel.entity";
import type { SuccessResponse } from "@salc/core/interfaces";

export interface GetStudentContractsUseCase {
    execute(studentId: string): Promise<SuccessResponse<StudentLevelEntity[]>>;
}

export class GetStudentContractsUseCaseImpl implements GetStudentContractsUseCase {
    constructor(
        private readonly studentLevelRepository: StudentLevelRepository
    ) {}

    async execute(studentId: string): Promise<SuccessResponse<StudentLevelEntity[]>> {
        return this.studentLevelRepository.getStudentContracts(studentId);
    }
}
