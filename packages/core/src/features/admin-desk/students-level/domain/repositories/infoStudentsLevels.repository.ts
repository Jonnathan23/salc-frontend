import type { SuccessResponse } from "@salc/core/interfaces";
import type { SearchStudentsLevelsDto } from "@salc/core/features/admin-desk/students-level/domain/dtos/SearchStudentsLevels.dto";
import type { StudentSearchProjectionEntity } from "@salc/core/features/admin-desk/students-level/domain/entities/StudentSearchProjection.entity";
import type { StudentTimelineProjectionEntity } from "@salc/core/features/admin-desk/students-level/domain/entities/StudentTimelineProjection.entity";

export abstract class InfoStudentsLevelsRepository {
    abstract searchStudents(dto: SearchStudentsLevelsDto): Promise<SuccessResponse<StudentSearchProjectionEntity[]>>;
    abstract getStudentTimeline(studentId: string): Promise<SuccessResponse<StudentTimelineProjectionEntity>>;
}
