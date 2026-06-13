import type { StudentRepository } from "@salc/core/features/admin-desk/students/domain/repositories/student.repository";
import type { StudentEntity } from "@salc/core/features/admin-desk/students/domain/entities/Student.entity";
import type { SearchStudentsByCriteriaDto } from "@salc/core/features/admin-desk/students/domain/dtos/SearchStudentsByCriteria.dto";
import type { SuccessResponse } from "@salc/core/interfaces";

export class SearchStudentsByCriteriaUseCase {
    constructor(private readonly studentRepository: StudentRepository) {}

    async execute(dto: SearchStudentsByCriteriaDto): Promise<SuccessResponse<StudentEntity[]>> {
        return await this.studentRepository.searchByCriteria(dto);
    }
}
