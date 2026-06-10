import { CustomError } from "@salc/core/enums";
import type { SearchStudentsLevelsDto } from "@salc/core/features/admin-desk/students-level/domain/dtos/SearchStudentsLevels.dto";
import type { InfoStudentsLevelsDataSource } from "@salc/core/features/admin-desk/students-level/domain/datasources/infoStudentsLevels.datasource";
import type { StudentSearchProjectionEntity } from "@salc/core/features/admin-desk/students-level/domain/entities/StudentSearchProjection.entity";
import type { StudentTimelineProjectionEntity } from "@salc/core/features/admin-desk/students-level/domain/entities/StudentTimelineProjection.entity";
import type { StudentSearchProjectionMapper } from "@salc/core/features/admin-desk/students-level/infrastructure/mappers/studentSearchProjection.mapper";
import type { StudentTimelineProjectionMapper } from "@salc/core/features/admin-desk/students-level/infrastructure/mappers/studentTimelineProjection.mapper";
import type { MethodsHttp, SuccessResponse } from "@salc/core/interfaces";
import type { BackendResponseProps } from "@salc/core/types/BackendResponse.type";

export class InfoStudentsLevelsDataSourceImpl implements InfoStudentsLevelsDataSource {
    private readonly baseUrl = "/student-levels";
    private readonly timelineUrl = `${this.baseUrl}/student`;

    constructor(
        private readonly api: MethodsHttp,
        private readonly searchMapper: StudentSearchProjectionMapper,
        private readonly timelineMapper: StudentTimelineProjectionMapper,
    ) {}

    async searchStudents(dto: SearchStudentsLevelsDto): Promise<SuccessResponse<StudentSearchProjectionEntity[]>> {
        const url = `${this.baseUrl}/search`;

        const queryParameters = {
            searchTerm: dto.searchTerm,
            limit: dto.limit,
        };

        const rawResponse = await this.api.get<SuccessResponse<BackendResponseProps[]>>(url, { parameters: queryParameters });

        if (!rawResponse.data) {
            throw CustomError.notFound("Students not found");
        }

        const students = this.searchMapper.toArrayEntities(rawResponse.data);

        return {
            ...rawResponse,
            data: students,
        };
    }

    async getStudentTimeline(studentId: string): Promise<SuccessResponse<StudentTimelineProjectionEntity>> {
        const url = `${this.timelineUrl}/${studentId}/timeline`;

        const rawResponse = await this.api.get<SuccessResponse<BackendResponseProps>>(url);

        if (!rawResponse.data) {
            throw CustomError.notFound("Student timeline not found");
        }

        const timeline = this.timelineMapper.toEntity(rawResponse.data);

        return {
            ...rawResponse,
            data: timeline,
        };
    }
}
