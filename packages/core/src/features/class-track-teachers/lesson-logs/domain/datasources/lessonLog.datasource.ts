import type { CreateLessonLogsDto } from "@salc/core/features/class-track-teachers/lesson-logs/domain/dtos/CreateLessonLogs.dto";
import type { GetLastLessonLogDto } from "@salc/core/features/class-track-teachers/lesson-logs/domain/dtos/GetLastLessonLog.dto";
import type { LessonLogEntity } from "@salc/core/features/class-track-teachers/lesson-logs/domain/entities/LessonLog.entity";
import type { SuccessResponse } from "@salc/core/interfaces";

export abstract class LessonLogDataSource {
    abstract createLessonLogs(dto: CreateLessonLogsDto): Promise<SuccessResponse<LessonLogEntity[]>>;
    abstract getLastLessonLog(dto: GetLastLessonLogDto): Promise<SuccessResponse<LessonLogEntity>>;
}
