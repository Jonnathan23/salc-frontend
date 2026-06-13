import type {
    RegisterStudentDto,
    UpdateStudentDto,
    ChangeContractStatusDto,
    SearchStudentsByCriteriaDto,
} from "@salc/core/features/admin-desk/students/domain/dtos";
import { type StudentMapper } from "@salc/core/features/admin-desk/students/infrastructure/mappers/student.mapper";
import { StudentDataSource } from "@salc/core/features/admin-desk/students/domain/datasources/student.datasource";
import { type StudentEntity } from "@salc/core/features/admin-desk/students/domain/entities/Student.entity";
import { type SuccessResponse, type MethodsHttp, type PaginatedResult } from "@salc/core/interfaces";
import { CustomError } from "@salc/core/enums";

export class StudentDataSourceImpl implements StudentDataSource {
    private readonly baseUrl = "/students";

    constructor(
        private readonly apiStudents: MethodsHttp,
        private readonly studentMapper: StudentMapper,
    ) {}

    async register(dto: RegisterStudentDto): Promise<SuccessResponse<StudentEntity>> {
        const url = `${this.baseUrl}/Register`;
        const rawResponse = await this.apiStudents.post<SuccessResponse<StudentEntity>, RegisterStudentDto>(url, dto);

        if (!rawResponse.data) {
            throw CustomError.notFound("Could not register student");
        }

        const student = this.studentMapper.toEntity(rawResponse.data);

        return {
            ...rawResponse,
            data: student,
        };
    }

    async search(query: string): Promise<SuccessResponse<StudentEntity[]>> {
        const url = `${this.baseUrl}/search`;
        const queryParameters = {
            q: query,
        };

        const rawResponse = await this.apiStudents.get<SuccessResponse<StudentEntity[]>>(url, {
            parameters: queryParameters,
        });

        if (!rawResponse.data) {
            throw CustomError.notFound("No students found");
        }

        const students = this.studentMapper.toArrayEntities(rawResponse.data);

        return {
            ...rawResponse,
            data: students,
        };
    }

    async searchByCriteria(dto: SearchStudentsByCriteriaDto): Promise<SuccessResponse<PaginatedResult<StudentEntity>>> {
        const url = `${this.baseUrl}/search/criteria`;
        const queryParameters = {
            page: dto.page,
            searchTerm: dto.searchTerm,
            st_nationality: dto.st_nationality,
            st_certificate_type: dto.st_certificate_type,
            st_is_graduated: dto.st_is_graduated,
            st_contract_status: dto.st_contract_status,
            st_progress_category: dto.st_progress_category,
        };

        const rawResponse = await this.apiStudents.get<SuccessResponse<PaginatedResult<StudentEntity>>>(url, {
            parameters: queryParameters,
        });

        if (!rawResponse.data) {
            throw CustomError.notFound("No students found by criteria");
        }

        const students = this.studentMapper.toArrayEntities(rawResponse.data.data);

        return {
            ...rawResponse,
            data: {
                ...rawResponse.data,
                data: students,
            },
        };
    }

    async getAllStudents(): Promise<SuccessResponse<StudentEntity[]>> {
        const url = `${this.baseUrl}`;
        const rawResponse = await this.apiStudents.get<SuccessResponse<StudentEntity[]>>(url);

        if (!rawResponse.data) {
            throw CustomError.notFound("No students found");
        }

        const students = this.studentMapper.toArrayEntities(rawResponse.data);

        return {
            ...rawResponse,
            data: students,
        };
    }

    async update(id: string, dto: UpdateStudentDto): Promise<SuccessResponse<StudentEntity>> {
        const url = `${this.baseUrl}/${id}`;
        const rawResponse = await this.apiStudents.patch<SuccessResponse<StudentEntity>, UpdateStudentDto>(url, dto);

        if (!rawResponse.data) {
            throw CustomError.notFound("Could not update student");
        }

        const student = this.studentMapper.toEntity(rawResponse.data);

        return {
            ...rawResponse,
            data: student,
        };
    }

    async changeContractStatus(id: string, dto: ChangeContractStatusDto): Promise<SuccessResponse<StudentEntity>> {
        const url = `${this.baseUrl}/${id}/contract-status`;
        const rawResponse = await this.apiStudents.patch<SuccessResponse<StudentEntity>, ChangeContractStatusDto>(url, dto);

        if (!rawResponse.data) {
            throw CustomError.notFound("Could not change contract status");
        }

        const student = this.studentMapper.toEntity(rawResponse.data);

        return {
            ...rawResponse,
            data: student,
        };
    }

    async toggleGraduated(id: string): Promise<SuccessResponse<StudentEntity>> {
        const url = `${this.baseUrl}/${id}/graduated`;
        const rawResponse = await this.apiStudents.patch<SuccessResponse<StudentEntity>, null>(url, null);

        if (!rawResponse.data) {
            throw CustomError.notFound("Could not toggle graduated status");
        }

        const student = this.studentMapper.toEntity(rawResponse.data);

        return {
            ...rawResponse,
            data: student,
        };
    }

    async deactivate(id: string): Promise<SuccessResponse<StudentEntity>> {
        const url = `${this.baseUrl}/${id}/deactivate`;
        const rawResponse = await this.apiStudents.patch<SuccessResponse<StudentEntity>, null>(url, null);

        if (!rawResponse.data) {
            throw CustomError.notFound("Could not deactivate student");
        }

        const student = this.studentMapper.toEntity(rawResponse.data);

        return {
            ...rawResponse,
            data: student,
        };
    }
}
