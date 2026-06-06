import type { StudentLevelRepository } from "@salc/core/features/admin-desk/students-level/domain/repositories/student-level.repository";
import type { StudentLevelEntity } from "@salc/core/features/admin-desk/students-level/domain/entities/StudentLevel.entity";
import type { UpdateStudentModuleDto } from "@salc/core/features/admin-desk/students-level/domain/dtos/UpdateStuden.dto";
import type { SuccessResponse } from "@salc/core/interfaces";

export interface UpdateStudentLevelUseCase {
    execute(dto: UpdateStudentModuleDto): Promise<SuccessResponse<StudentLevelEntity[]>>;
}

export class UpdateStudentLevelUseCaseImpl implements UpdateStudentLevelUseCase {
    constructor(private readonly studentLevelRepository: StudentLevelRepository) {}

    async execute(dto: UpdateStudentModuleDto): Promise<SuccessResponse<StudentLevelEntity[]>> {
        return this.studentLevelRepository.updateStudentLevel(dto);
    }
}
