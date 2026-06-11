import type { SearchStudentsDto } from "@salc/core/features/class-track-teachers/students/domain/dtos/SearchStudents.dto";
import type { StudentClassTrackEntity } from "@salc/core/features/class-track-teachers/students/domain/entities/StudentClassTrack.entity";
import type { SuccessResponse } from "@salc/core/interfaces";

export abstract class StudentDatasourceClassTrack {
    abstract searchStudents(dto: SearchStudentsDto): Promise<SuccessResponse<StudentClassTrackEntity[]>>;
}
