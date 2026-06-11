import { StudentDataSource } from "@salc/core/features/admin-desk/students/domain/datasources/student.datasource";
import type { ChangeContractStatusDto } from "@salc/core/features/admin-desk/students/domain/dtos";
import { StudentEntity } from "@salc/core/features/admin-desk/students/domain/entities/Student.entity";
import type { SuccessResponse } from "@salc/core/interfaces";

export class ChangeContractStatusUseCase {
    constructor(private readonly studentRepository: StudentDataSource) {}

    async execute(id: string, dto: ChangeContractStatusDto): Promise<SuccessResponse<StudentEntity>> {
        return await this.studentRepository.changeContractStatus(id, dto);
    }
}
