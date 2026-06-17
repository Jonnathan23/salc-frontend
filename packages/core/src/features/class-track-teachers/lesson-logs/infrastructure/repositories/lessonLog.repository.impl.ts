import type { LessonLogDataSource } from "@salc/core/features/class-track-teachers/lesson-logs/domain/datasources/lessonLog.datasource";
import type { LessonLogRepository } from "@salc/core/features/class-track-teachers/lesson-logs/domain/repositories/lessonLog.repository";
import type { CreateLessonLogsDto } from "@salc/core/features/class-track-teachers/lesson-logs/domain/dtos/CreateLessonLogs.dto";
import type { GetLastLessonLogDto } from "@salc/core/features/class-track-teachers/lesson-logs/domain/dtos/GetLastLessonLog.dto";
import type { LessonLogEntity } from "@salc/core/features/class-track-teachers/lesson-logs/domain/entities/LessonLog.entity";
import type { SuccessResponse } from "@salc/core/interfaces";

export class LessonLogRepositoryImpl implements LessonLogRepository {
    constructor(private readonly dataSource: LessonLogDataSource) {}

    async createLessonLogs(dto: CreateLessonLogsDto): Promise<SuccessResponse<LessonLogEntity[]>> {
        return this.dataSource.createLessonLogs(dto);
    }

    async getLastLessonLog(dto: GetLastLessonLogDto): Promise<SuccessResponse<LessonLogEntity>> {
        return this.dataSource.getLastLessonLog(dto);
    }
}
