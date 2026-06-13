import { StudentDataSource } from "@salc/core/features/admin-desk/students/domain/datasources/student.datasource";
import type {
    RegisterStudentDto,
    UpdateStudentDto,
    ChangeContractStatusDto,
    SearchStudentsByCriteriaDto,
} from "@salc/core/features/admin-desk/students/domain/dtos";
import { StudentEntity } from "@salc/core/features/admin-desk/students/domain/entities/Student.entity";
import { StudentRepository } from "@salc/core/features/admin-desk/students/domain/repositories/student.repository";
import type { SuccessResponse, PaginatedResult } from "@salc/core/interfaces";

export class StudentRepositoryImpl implements StudentRepository {
    constructor(private readonly studentDataSource: StudentDataSource) {}

    register(dto: RegisterStudentDto): Promise<SuccessResponse<StudentEntity>> {
        return this.studentDataSource.register(dto);
    }

    search(query: string): Promise<SuccessResponse<StudentEntity[]>> {
        return this.studentDataSource.search(query);
    }

    searchByCriteria(dto: SearchStudentsByCriteriaDto): Promise<SuccessResponse<PaginatedResult<StudentEntity>>> {
        return this.studentDataSource.searchByCriteria(dto);
    }

    getAllStudents(): Promise<SuccessResponse<StudentEntity[]>> {
        return this.studentDataSource.getAllStudents();
    }

    update(id: string, dto: UpdateStudentDto): Promise<SuccessResponse<StudentEntity>> {
        return this.studentDataSource.update(id, dto);
    }

    changeContractStatus(id: string, dto: ChangeContractStatusDto): Promise<SuccessResponse<StudentEntity>> {
        return this.studentDataSource.changeContractStatus(id, dto);
    }

    toggleGraduated(id: string): Promise<SuccessResponse<StudentEntity>> {
        return this.studentDataSource.toggleGraduated(id);
    }

    deactivate(id: string): Promise<SuccessResponse<StudentEntity>> {
        return this.studentDataSource.deactivate(id);
    }
}
