import { StudentDataSource } from "@salc/core/features/admin-desk/students/domain/datasources/Student.datasource";
import { StudentEntity } from "@salc/core/features/admin-desk/students/domain/entities/Student.entity";
import { SuccessResponse } from "@salc/core/interfaces";


interface GetAllStudentsUseCase {
    execute(): Promise<SuccessResponse<StudentEntity[]>>;
}

export class GetAllStudentsUseCaseImpl implements GetAllStudentsUseCase {
    constructor(
        private readonly studentRepository: StudentDataSource
    ) { }

    async execute(): Promise<SuccessResponse<StudentEntity[]>> {
        return await this.studentRepository.getAllStudents();
    }
}