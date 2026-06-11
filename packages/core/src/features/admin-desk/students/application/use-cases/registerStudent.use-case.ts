import type { StudentDataSource } from "@salc/core/features/admin-desk/students/domain/datasources/student.datasource";
import type { StudentEntity } from "@salc/core/features/admin-desk/students/domain/entities/Student.entity";
import type { RegisterStudentDto } from "@salc/core/features/admin-desk/students/domain/dtos";
import type { SuccessResponse } from "@salc/core/interfaces";

export class RegisterStudentUseCase {
    constructor(private readonly studentRepository: StudentDataSource) {}

    async execute(dto: RegisterStudentDto): Promise<SuccessResponse<StudentEntity>> {
        return await this.studentRepository.register(dto);
    }
}
