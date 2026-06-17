import type { LessonLogRepository } from "@salc/core/features/class-track-teachers/lesson-logs/domain/repositories/lessonLog.repository";
import type { LessonLogEntity } from "@salc/core/features/class-track-teachers/lesson-logs/domain/entities/LessonLog.entity";
import type { GetLastLessonLogDto } from "@salc/core/features/class-track-teachers/lesson-logs/domain/dtos/GetLastLessonLog.dto";
import type { SuccessResponse } from "@salc/core/interfaces";

export class GetLastLessonLogUseCase {
    constructor(private readonly lessonLogRepository: LessonLogRepository) {}

    async execute(dto: GetLastLessonLogDto): Promise<SuccessResponse<LessonLogEntity>> {
        return await this.lessonLogRepository.getLastLessonLog(dto);
    }
}
