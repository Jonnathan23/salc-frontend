import type { InfoStudentsLevelsRepository } from "@salc/core/features/admin-desk/students-level/domain/repositories/infoStudentsLevels.repository";
import type { StudentTimelineProjectionEntity } from "@salc/core/features/admin-desk/students-level/domain/entities/StudentTimelineProjection.entity";
import type { SuccessResponse } from "@salc/core/interfaces";

export class GetStudentTimelineUseCase {
    constructor(private readonly repository: InfoStudentsLevelsRepository) {}

    async execute(studentId: string): Promise<SuccessResponse<StudentTimelineProjectionEntity>> {
        return await this.repository.getStudentTimeline(studentId);
    }
}
