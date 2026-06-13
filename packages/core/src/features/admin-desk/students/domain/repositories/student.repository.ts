import {
    type ChangeContractStatusDto,
    type RegisterStudentDto,
    type UpdateStudentDto,
    SearchStudentsByCriteriaDto,
} from "@salc/core/features/admin-desk/students/domain/dtos";
import type { StudentEntity } from "@salc/core/features/admin-desk/students/domain/entities/Student.entity";
import type { SuccessResponse, PaginatedResult } from "@salc/core/interfaces";

export abstract class StudentRepository {
    abstract register(dto: RegisterStudentDto): Promise<SuccessResponse<StudentEntity>>;
    abstract search(query: string): Promise<SuccessResponse<StudentEntity[]>>;
    abstract searchByCriteria(dto: SearchStudentsByCriteriaDto): Promise<SuccessResponse<PaginatedResult<StudentEntity>>>;
    abstract getAllStudents(): Promise<SuccessResponse<StudentEntity[]>>;
    abstract update(id: string, dto: UpdateStudentDto): Promise<SuccessResponse<StudentEntity>>;
    abstract changeContractStatus(id: string, dto: ChangeContractStatusDto): Promise<SuccessResponse<StudentEntity>>;
    abstract toggleGraduated(id: string): Promise<SuccessResponse<StudentEntity>>;
    abstract deactivate(id: string): Promise<SuccessResponse<StudentEntity>>;
}
