import type { CreateLessonLogsDto } from "@salc/core/features/class-track-teachers/lesson-logs/domain/dtos/CreateLessonLogs.dto";
import type { GetLastLessonLogDto } from "@salc/core/features/class-track-teachers/lesson-logs/domain/dtos/GetLastLessonLog.dto";
import type { LessonLogMapper } from "@salc/core/features/class-track-teachers/lesson-logs/infrastructure/mappers/lessonLog.mapper";
import type { LessonLogDataSource } from "@salc/core/features/class-track-teachers/lesson-logs/domain/datasources/lessonLog.datasource";
import type { LessonLogEntity } from "@salc/core/features/class-track-teachers/lesson-logs/domain/entities/LessonLog.entity";
import type { MethodsHttp, SuccessResponse } from "@salc/core/interfaces";
import { CustomError } from "@salc/core/enums";

export class LessonLogDataSourceImpl implements LessonLogDataSource {
    private readonly baseUrl = "/lesson-log";

    constructor(
        private readonly api: MethodsHttp,
        private readonly lessonLogMapper: LessonLogMapper,
    ) {}

    async createLessonLogs(dto: CreateLessonLogsDto): Promise<SuccessResponse<LessonLogEntity[]>> {
        const url = `${this.baseUrl}/`;

        const rawResponse = await this.api.post<SuccessResponse<LessonLogEntity[]>, CreateLessonLogsDto>(url, dto);

        if (!rawResponse.data) {
            throw CustomError.notFound("Could not create lesson logs");
        }

        const lessonLogs = this.lessonLogMapper.toArrayEntities(rawResponse.data);

        return {
            ...rawResponse,
            data: lessonLogs,
        };
    }

    async getLastLessonLog(dto: GetLastLessonLogDto): Promise<SuccessResponse<LessonLogEntity>> {
        const url = `${this.baseUrl}/student/${dto.studentId}/last`;

        const rawResponse = await this.api.get<SuccessResponse<LessonLogEntity>>(url);

        if (!rawResponse.data) {
            throw CustomError.notFound("Could not retrieve the last lesson log");
        }

        const lessonLog = this.lessonLogMapper.toEntity(rawResponse.data);

        return {
            ...rawResponse,
            data: lessonLog,
        };
    }
}
