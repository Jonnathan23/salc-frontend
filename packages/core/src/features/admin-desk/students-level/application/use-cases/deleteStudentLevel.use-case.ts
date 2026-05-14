import type { StudentLevelRepository } from "@salc/core/features/admin-desk/students-level/domain/repositories/student-level.repository";
import type { SuccessResponse } from "@salc/core/interfaces";

export interface DeleteStudentLevelUseCase {
    execute(studentLevelId: string): Promise<SuccessResponse<void>>;
}

export class DeleteStudentLevelUseCaseImpl implements DeleteStudentLevelUseCase {
    constructor(
        private readonly studentLevelRepository: StudentLevelRepository
    ) {}

    async execute(studentLevelId: string): Promise<SuccessResponse<void>> {
        return this.studentLevelRepository.deleteStudentLevel(studentLevelId);
    }
}
