import type { InfoStudentsLevelsRepository } from "@salc/core/features/admin-desk/students-level/domain/repositories/infoStudentsLevels.repository";
import type { SearchStudentsLevelsDto } from "@salc/core/features/admin-desk/students-level/domain/dtos/SearchStudentsLevels.dto";
import type { StudentSearchProjectionEntity } from "@salc/core/features/admin-desk/students-level/domain/entities/StudentSearchProjection.entity";
import type { SuccessResponse } from "@salc/core/interfaces";

export class SearchStudentsLevelsUseCase {
    constructor(private readonly repository: InfoStudentsLevelsRepository) {}

    async execute(dto: SearchStudentsLevelsDto): Promise<SuccessResponse<StudentSearchProjectionEntity[]>> {
        return await this.repository.searchStudents(dto);
    }
}
