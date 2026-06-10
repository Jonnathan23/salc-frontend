import type { StudentRepositoryClassTrack } from "@salc/core/features/class-track-teachers/students/domain/repositories/studentClassTrack.repository";
import type { StudentClassTrackEntity } from "@salc/core/features/class-track-teachers/students/domain/entities/StudentClassTrack.entity";
import type { SearchStudentsDto } from "@salc/core/features/class-track-teachers/students/domain/dtos/SearchStudents.dto";
import type { SuccessResponse } from "@salc/core/interfaces";

export class SearchStudentsUseCase {
    constructor(private readonly studentRepository: StudentRepositoryClassTrack) {}

    async execute(dto: SearchStudentsDto): Promise<SuccessResponse<StudentClassTrackEntity[]>> {
        return await this.studentRepository.searchStudents(dto);
    }
}
