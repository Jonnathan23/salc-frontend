import type { InfoStudentsLevelsDataSource } from "@salc/core/features/admin-desk/students-level/domain/datasources/infoStudentsLevels.datasource";
import type { InfoStudentsLevelsRepository } from "@salc/core/features/admin-desk/students-level/domain/repositories/infoStudentsLevels.repository";
import type { SearchStudentsLevelsDto } from "@salc/core/features/admin-desk/students-level/domain/dtos/SearchStudentsLevels.dto";
import type { StudentSearchProjectionEntity } from "@salc/core/features/admin-desk/students-level/domain/entities/StudentSearchProjection.entity";
import type { StudentTimelineProjectionEntity } from "@salc/core/features/admin-desk/students-level/domain/entities/StudentTimelineProjection.entity";
import type { SuccessResponse } from "@salc/core/interfaces";

export class InfoStudentsLevelsRepositoryImpl implements InfoStudentsLevelsRepository {
    constructor(private readonly dataSource: InfoStudentsLevelsDataSource) {}

    async searchStudents(dto: SearchStudentsLevelsDto): Promise<SuccessResponse<StudentSearchProjectionEntity[]>> {
        return this.dataSource.searchStudents(dto);
    }

    async getStudentTimeline(studentId: string): Promise<SuccessResponse<StudentTimelineProjectionEntity>> {
        return this.dataSource.getStudentTimeline(studentId);
    }
}
