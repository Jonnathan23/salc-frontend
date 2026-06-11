import type { StudentDataSource } from "@salc/core/features/admin-desk/students/domain/datasources/student.datasource";
import type { StudentEntity } from "@salc/core/features/admin-desk/students/domain/entities/Student.entity";
import type { SuccessResponse } from "@salc/core/interfaces";

export class ToggleGraduatedUseCase {
    constructor(private readonly studentRepository: StudentDataSource) {}

    async execute(id: string): Promise<SuccessResponse<StudentEntity>> {
        return await this.studentRepository.toggleGraduated(id);
    }
}
