import { StudentDatasourceClassTrack } from "@salc/core/features/class-track-teachers/students/domain/datasources/studentClassTrack.datasource";
import { StudentRepositoryClassTrack } from "@salc/core/features/class-track-teachers/students/domain/repositories/studentClassTrack.repository";
import type { SearchStudentsDto } from "@salc/core/features/class-track-teachers/students/domain/dtos/SearchStudents.dto";
import type { StudentClassTrackEntity } from "@salc/core/features/class-track-teachers/students/domain/entities/StudentClassTrack.entity";
import type { SuccessResponse } from "@salc/core/interfaces";

export class StudentRepositoryClassTrackImpl implements StudentRepositoryClassTrack {
    constructor(private readonly dataSource: StudentDatasourceClassTrack) {}

    async searchStudents(dto: SearchStudentsDto): Promise<SuccessResponse<StudentClassTrackEntity[]>> {
        return this.dataSource.searchStudents(dto);
    }
}
