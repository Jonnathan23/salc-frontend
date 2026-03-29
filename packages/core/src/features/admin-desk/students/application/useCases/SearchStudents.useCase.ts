import { StudentDataSource } from "../../domain/datasources/Student.datasource";
import { StudentEntity } from "../../domain/entities/Student.entity";
import { SuccessResponse } from "@salc/core/interfaces";

export class SearchStudentsUseCase {
    constructor(private readonly studentRepository: StudentDataSource) {}

    async execute(query: string): Promise<SuccessResponse<StudentEntity[]>> {
        return await this.studentRepository.search(query);
    }
}
