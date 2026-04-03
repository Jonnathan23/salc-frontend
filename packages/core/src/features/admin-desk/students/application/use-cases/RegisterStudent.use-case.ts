import { StudentDataSource } from "../../domain/datasources/Student.datasource";
import { RegisterStudentDto } from "../../domain/dtos";
import { StudentEntity } from "../../domain/entities/Student.entity";
import { SuccessResponse } from "@salc/core/interfaces";

export class RegisterStudentUseCase {
    constructor(private readonly studentRepository: StudentDataSource) {}

    async execute(dto: RegisterStudentDto): Promise<SuccessResponse<StudentEntity>> {
        return await this.studentRepository.register(dto);
    }
}
