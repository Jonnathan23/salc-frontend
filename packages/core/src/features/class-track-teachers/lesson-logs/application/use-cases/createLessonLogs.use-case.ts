import type { LessonLogRepository } from "@salc/core/features/class-track-teachers/lesson-logs/domain/repositories/lessonLog.repository";
import type { LessonLogEntity } from "@salc/core/features/class-track-teachers/lesson-logs/domain/entities/LessonLog.entity";
import type { CreateLessonLogsDto } from "@salc/core/features/class-track-teachers/lesson-logs/domain/dtos/CreateLessonLogs.dto";
import type { SuccessResponse } from "@salc/core/interfaces";

export class CreateLessonLogsUseCase {
    constructor(private readonly lessonLogRepository: LessonLogRepository) {}

    async execute(dto: CreateLessonLogsDto): Promise<SuccessResponse<LessonLogEntity[]>> {
        return await this.lessonLogRepository.createLessonLogs(dto);
    }
}
