import { StudentDataSource } from "../../domain/datasources/Student.datasource";
import { UpdateStudentDto } from "../../domain/dtos";
import { StudentEntity } from "../../domain/entities/Student.entity";
import { SuccessResponse } from "@salc/core/interfaces";

export class UpdateStudentUseCase {
    constructor(private readonly studentRepository: StudentDataSource) {}

    async execute(id: string, dto: UpdateStudentDto): Promise<SuccessResponse<StudentEntity>> {
        return await this.studentRepository.update(id, dto);
    }
}
