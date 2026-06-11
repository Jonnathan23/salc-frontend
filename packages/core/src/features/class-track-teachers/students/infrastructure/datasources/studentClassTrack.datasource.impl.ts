import type { SearchStudentsDto } from "@salc/core/features/class-track-teachers/students/domain/dtos/SearchStudents.dto";
import { StudentDatasourceClassTrack } from "@salc/core/features/class-track-teachers/students/domain/datasources/studentClassTrack.datasource";
import type { StudentClassTrackEntity } from "@salc/core/features/class-track-teachers/students/domain/entities/StudentClassTrack.entity";
import type { StudentMapperClassTrack } from "@salc/core/features/class-track-teachers/students/infrastructure/mappers/studentClassTrack.mapper";
import type { MethodsHttp, SuccessResponse } from "@salc/core/interfaces";
import { CustomError } from "@salc/core/enums";

export class StudentDatasourceClassTrackImpl implements StudentDatasourceClassTrack {
    private readonly baseUrl = "/class-track/students";

    constructor(
        private readonly api: MethodsHttp,
        private readonly studentMapper: StudentMapperClassTrack,
    ) {}

    async searchStudents(dto: SearchStudentsDto): Promise<SuccessResponse<StudentClassTrackEntity[]>> {
        const url = `${this.baseUrl}/search`;

        const queryParameters = {
            searchTerm: dto.searchTerm,
            limit: dto.limit,
        };

        const rawResponse = await this.api.get<SuccessResponse<StudentClassTrackEntity[]>>(url, { parameters: queryParameters });

        if (!rawResponse.data) {
            throw CustomError.notFound("Could not search students");
        }

        const students = this.studentMapper.toArrayEntities(rawResponse.data);

        return {
            ...rawResponse,
            data: students,
        };
    }
}
